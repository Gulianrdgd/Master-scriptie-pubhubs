import {
	TMessageEventContent,
	TVideoMessageEventContent
} from '@/model/events/TMessageEvent';
import { TEvent } from '@/model/events/TEvent';
import { usePlugins } from '@/store/plugins';
import { useRooms } from '@/store/rooms';
import { sanitizeHtml } from '@/core/sanitizer';

/**
 * This class handles all changes that should be made to incoming timeline events
 * In future Matrix spec some refacturing is needed: https://github.com/matrix-org/matrix-spec-proposals/blob/main/proposals/1767-extensible-events.md
 */

// Tags for mentions
const startMentionTag = '<span class="message-mention">';
const endMentionTag = '</span>';

// Tag for links
const linkTag = '<a class="message-link" target="_blank" ';
const endLinkTag = '</a>';

// Regex for replacing urls with clickable links
const removeLinkTagsPattern = /<a.*?href="([^"]*?)"[^>]*?>.*?<\/a\s*?>/gi;
const urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#/%?=~_|!:,.;]*[a-z0-9-+&@#/%=~_|]/gim; // http://, https://, ftp://
const pseudoUrlPattern = /(^|[^/])(www\.[\S]+(\b|$))/gim; // www. sans http:// or https://
const emailAddressPattern = /(([a-zA-Z0-9_\-.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim; // Email addresses

// Regex for replacing mentions (pseudonym with 2*3-6 digits, in theory the pseudonym could go up to 2*14 digits, but 6 should be good enough for this purpose)
const mentionsPattern = /(@[^@]*\s{1}-\s{1}([0-9a-f]{3}?-[0-9a-f]{3}?|[0-9a-f]{4}?-[0-9a-f]{4}?|[0-9a-f]{5}?-[0-9a-f]{5}?|[0-9a-f]{6}?-[0-9a-f]{6}?))/g;

class EventTimeLineHandler {
	previous_calls: string[] = [];

	// Core method that will call all others
	public transformEventContent(event: Partial<TEvent>) {
		const eventContent = event.content as TMessageEventContent;

		if(event.type !== 'org.matrix.msc3401.call') {
			eventContent.ph_body = eventContent.body;
		}else{
			eventContent.ph_body = 'Video call';
		}

		if (eventContent.msgtype === 'm.text') {
			if (typeof eventContent.format === 'string') {
				if (eventContent.format === 'org.matrix.custom.html' && typeof eventContent.formatted_body === 'string') {
					eventContent.ph_body = eventContent.formatted_body;
				}
			}
		}


		eventContent.ph_body = this.createClickableLinks(eventContent.ph_body);
		eventContent.ph_body = this.addMentions(eventContent.ph_body);
		eventContent.ph_body = this.addLineBreaks(eventContent.ph_body);
		eventContent.ph_body = this.sanitizeEventContent(eventContent.ph_body);

		event = this.checkPluginEventContent(event);
		event = this.checkVideoCallEventContent(event);

		return event;
	}

	private createClickableLinks(body: string) {
		// first remove current <a tags, so no doubles are created and all of them have same styling
		body = body.replace(removeLinkTagsPattern, '$1');
		// transform all flat links to PubHubs specific link tag.
		return body
			.replace(urlPattern, linkTag + 'href="$&">$&' + endLinkTag)
			.replace(pseudoUrlPattern, '$1' + linkTag + 'href="http://$2">$2' + endLinkTag)
			.replace(emailAddressPattern, linkTag + 'href="mailto:$1">$1' + endLinkTag);
	}

	private addMentions(body: string) {
		// First test if there is an @ in body
		if (body.match(/^@|\s@/)) {
			// If so, replace them with mentions, except email-addresses
			body = body.replace(mentionsPattern, startMentionTag + '$1' + endMentionTag);
		}
		return body;
	}

	private addLineBreaks(body: string) {
		body = body.replace(/\r?\n/g, '<br/>');
		return body;
	}

	private sanitizeEventContent(body: string) {
		body = sanitizeHtml(body);
		return body;
	}

	private checkPluginEventContent(event: Partial<TEvent>) {
		const roomId = event.room_id;
		if (!roomId) return event;

		const plugins = usePlugins();
		const rooms = useRooms();
		const roomType = rooms.room(roomId)?.getType();
		const eventPlugin = plugins.getEventPlugin(event, roomId, roomType);
		if (eventPlugin) {
			event.plugin = eventPlugin;
		} else {
			const eventMessagePlugin = plugins.getEventMessagePlugin(event, roomId, roomType);
			if (eventMessagePlugin) {
				event.plugin = eventMessagePlugin;
			}
		}
		return event;
	}

	private checkVideoCallEventContent(event: Partial<TEvent>) {
		// @ts-expect-error: This is a hack to get the event content
		if(!(event.event_id && event.content && event.content['m.type'] === 'm.video')) {
			console.log('Not a video call event', event);
			return event;
		}

		const eventContent = event.content as TVideoMessageEventContent;
		eventContent.msgtype = 'm.videocall';
		// if(event.type === 'org.matrix.msc3401.call' && event.content['m.terminated'] && event.content['m.terminated'] === 'call_ended') {
		//
		// 	// const previous_id = event.unsigned.replaces_state;
		// 	//
		// 	// for(let i = idx; i >= 0; i--){
		// 	// 	const previous_event = timeline[i].event as unknown as Event;
		// 	// 	if(previous_event.event_id === previous_id){
		// 	// 		previous_event.content.hide = true;
		// 	// 		event.content.time = event.origin_server_ts - previous_event.origin_server_ts;
		// 	// 		break;
		// 	// 	}
		// 	// }
		//
		// }

		if(eventContent['m.intent'] !== 'ringing' && eventContent['m.terminated']) {
			// IDEA: if call then add it to list
			this.previous_calls.push(event.event_id);
		}else if(eventContent['m.terminated'] && eventContent['m.terminated'] === 'call_ended'){
			// IDEA: if it is already in there and terminated then terminate
			this.previous_calls = this.previous_calls.filter((call_id) => call_id !== event.event_id);
			// TODO: Previous should be hidden
			// eventContent.hide = true;
			event.content = eventContent;
		}

		return event;
	}
}

export { EventTimeLineHandler };
