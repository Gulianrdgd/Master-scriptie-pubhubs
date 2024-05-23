import { SyncState } from 'matrix-js-sdk/lib/sync';
import {
	MatrixClient,
	MatrixEvent,
	ClientEvent,
	Room as MatrixRoom,
	RoomEvent,
	RoomMemberEvent,
	RoomMember,
} from 'matrix-js-sdk';
import { TEvent } from '@/model/events/TEvent';
import { EventTimeLineHandler } from '@/core/eventTimeLineHandler';
import { useSettings, User, useConnection, useUser, useRooms, Room } from '@/store/store';
import { usePubHubs } from '@/core/pubhubsStore';
import {GroupCall} from "matrix-js-sdk/lib/webrtc/groupCall";
import {loadOlm} from "@/core/olm";
class Events {
	private readonly client: MatrixClient;
	private readonly eventTimeHandler = new EventTimeLineHandler();

	public constructor(client: MatrixClient) {
		this.client = client;
		this.client.on(RoomEvent.Name, this.eventRoomName);
		this.client.on(RoomEvent.Timeline, (event: MatrixEvent, matrixRoom: MatrixRoom | undefined, toStartOfTimeline: boolean | undefined) => this.eventRoomTimeline(this.eventTimeHandler, event, matrixRoom, toStartOfTimeline));
		this.client.on(RoomMemberEvent.Name, this.eventRoomMemberName);
		this.client.on(RoomMemberEvent.Membership, this.eventRoomMemberMembership(this.client));
	}

	initEvents() {
		return new Promise(  (resolve) => {

			// Start client sync
			const settings = useSettings();
			const deviceId = this.client.getDeviceId();
			if (!deviceId) {
				console.log('Device ID not found')
			}

			loadOlm().then(() => {
				console.log('Olm initialized');


			this.client.initCrypto().then(
				() => {
					console.log('normal crypto initialized');
					this.client.startClient({
						initialSyncLimit: settings.pagination,
						includeArchivedRooms: false,
					}).then(
						() => {
							console.log('Client started');
							this.client.on(ClientEvent.Sync, (state: SyncState) => {
								// console.debug('STATE:', state);

								const connection = useConnection();
								if (state === 'ERROR') {
									connection.error();
								}
								if (state === 'RECONNECTING') {
									connection.off();
								}
								if (state === 'SYNCING') {
									connection.on();
								}
								if (state === 'PREPARED') {
									// DEBUGGING purpose - To understand the following events.
									// this.client.on('event' as any, (event: any) => {
									// 	console.debug('== EVENT', event.getType());
									// 	console.debug('== EVENT', event);
									// });
									console.log('PREPARED');
									resolve(true);
								}
							});

						}
					);
				}
			)			});

			console.log('Device ID', deviceId);

			// this.client.startClient({
			// 	initialSyncLimit: settings.pagination,
			// 	includeArchivedRooms: false,
			// });
		});
	}

	/**
	 * Matrix Events
	 */

	eventRoomName(matrixRoom: MatrixRoom) {
		const rooms = useRooms();
		// Room display name can  be just Empty Room or display name can also be Empty Room followed by peudonym
		// Therefore, I can't compare it directly with equality, going with 'includes()' function to compare.
		if (!matrixRoom.name.includes('Empty')) {
			rooms.addRoom(new Room(matrixRoom));
		}
	}

	eventRoomTimeline(eventTimeLineHandler: EventTimeLineHandler, event: MatrixEvent, matrixRoom: MatrixRoom | undefined, toStartOfTimeline: boolean | undefined) {
		if (!matrixRoom) return;

		if ((event.event.type === 'm.room.message' && event.event.content?.msgtype === 'm.text') || event.event.type === 'org.matrix.msc3401.call') {
			event.event = eventTimeLineHandler.transformEventContent(event.event as Partial<TEvent>);
		}

		if (event.event.type === 'm.room.message' && event.event.content?.msgtype === 'm.notice') {
			const rooms = useRooms();
			//Messages are only in rooms.
			rooms.addProfileNotice(event.getRoomId()!, event.getContent().body);
		}

		if (!toStartOfTimeline) {
			if (event.event.type !== 'm.room.message') return;
			const rooms = useRooms();
			rooms.onModRoomMessage(event);
		}
	}

	eventRoomMemberName(event: MatrixEvent, member: RoomMember) {
		const user = useUser();
		// console.debug('RoomMember.name', member.user);
		if (member.user !== undefined && member.user.userId === user.user.userId) {
			user.setUser(member.user as User);
			if (member.user.displayName !== undefined) {
				user.user.setDisplayName(member.user.displayName);
			}
		}
	}

	eventRoomMemberMembership(client: MatrixClient) {
		return function eventRoomMemberMembershipInner(event: MatrixEvent, member: RoomMember) {
			const me = client.getUserId();
			// console.debug('RoomMember.membership', member.membership, member.userId, me, event.getRoomId());
			if (me === member.userId) {
				const rooms = useRooms();
				if (member.membership === 'leave') {
					const roomId = event.getRoomId();
					if (roomId !== undefined) {
						rooms.rooms[roomId].setHidden(true);
					}
				} else if (member.membership === 'invite') {
					const pubhubs = usePubHubs();
					pubhubs
						.joinRoom(member.roomId)
						.catch((e) => console.debug(e.toString()))
						//This sometimes gives an error when the room cannot be found, maybe it's an old experiment or
						// deleted. Reflects the state, so we just show some debug info.
						.then(function () {
							console.log('joined DM');
						});
				}
			}
		};
	}

	eventVideoCallState(call: GroupCall) {
		console.debug('== GroupCallEventHandlerEvent.Incoming', call, call.state !== 'ended');

		// const rooms = useRooms();

		// const roomId = call.room.roomId;
		// rooms.rooms[roomId].videoCallStarted = call.state !== 'ended';
		// rooms.rooms[roomId].setUpAndJoinMatrixVideoCall();
		// TODO: Add video call receive code
	}
}

export { Events };
