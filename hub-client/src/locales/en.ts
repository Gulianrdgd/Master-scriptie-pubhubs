const en = {
	state: {
		no_access: 'Your browser prevents the hub client from accessing its cookies and local storage, perhaps mistaking the hub client for a third-party tracker. Please click the button to request access.',
		button_request: 'Request access',
		initial: 'Checking whether hub client has access to cookies and local storage...',
		requesting: 'Requesting access...',
		denied: 'Sorry, the hub client cannot run without access to local storage',
		woops: 'Woops, I did not expect to find myself in this state.',
	},
	dialog: {
		ok: 'Ok',
		cancel: 'Cancel',
		close: 'Close',
		yes: 'Yes',
		no: 'No',
		submit: 'Submit',
		ignore: 'Ignore',
		continue: 'Continue',
		title_sure: 'Are you sure?',
	},
	errors: {
		error: 'Unfortunately an error occured. Please contact opthe developers.\n\n {0}',
		server: 'Server error',
		M_LIMIT_EXCEEDED: 'Too much login attempts. Try again in {0} seconds.',
		not_send_offline: 'Internet connection seems down. This message was not send.',
		resend: 'Send again',
	},
	file: {
		file: 'File',
		upload_file: 'Upload File',
		upload_message: 'Do you want to upload',
	},
	forms: {
		submit: 'Submit',
	},
	home: {
		hub_homepage_welcome: 'Welcome to this Hub!',
		hub_homepage_join: 'Join this Hub',
		hub_homepage_welcome_auth: 'Welcome to this Hub!',
		welcome: 'Welcome to <a href="https://pubhubs.net">PubHubs</a>.<br>PubHubs is a community platform based on public values.',
		highlighted_hubs: 'Highlighted Hubs',
		// Boven highlighted Hubs, iets afstand
		highlighted_hubs_info: 'PubHubs consist of seperate Hubs, where local conversations happen, under a central login. These Hubs are run by seperate, participating organisations.',
	},
	login: {
		login: 'Login',
		global_login: 'Login to PubHubs',
	},
	logout: {
		logout: 'Logout',
		logout_sure: 'Are you sure you want to logout?',
	},
	menu: {
		calender: 'Calender',
		home: 'Home',
		logout: 'Logout',
		name: 'Here will be a name',
		private_rooms: '@:rooms.private_rooms',
		rooms: '@:rooms.rooms',
		settings: 'Settings',
		tool: 'Tool',
		admin_tools: 'Admin tools',
		admin_tools_rooms: 'Manage rooms',
		moderation_tools: 'Moderation tools',
		moderation_tools_disclosure: 'Request disclosure',
	},
	others: {
		nop: 'This feature is not implement yet.',
		search: 'Search in this room',
		read_receipt: 'Read by',
		typing: 'Start typing...',
	},
	rooms: {
		room: 'Room:',
		me: 'Me',
		just_you: 'Just you',
		leave_sure: 'Do you really want to leave this room?',
		new_message: 'Type your message here',
		members: 'members',
		member: 'member',
		private_room: 'One on one room',
		private_members: 'With {0},{1}',
		private_rooms: 'One on one rooms',
		private_topic: 'A conversation between',
		private_add: 'New conversation',
		private_search_user: 'Search person',
		rooms: 'Rooms',
		join_room: 'Join a room',
		add_room: 'Add a room',
		name: 'Name of a room',
		name_general_room: 'General',
		name_feedback_room: 'Your feedback about PubHubs',
		filter: 'Filter rooms',
		title: '{0}',
		access_denied: 'Access Denied',
		secure_room_message_heading: 'Before you can enter...',
		secure_room_message: 'You need to show some more data from your Yivi app.',
		secure_room_enter_info: 'Please show the following:',
		secured_room_error: 'We are sorry, but it seems like you cannot access the room! Please check you gave the correct data with the Yivi App.',
		admin_badge: 'Admin',
		upload_error: 'Error while uploading',
		upload_not_allowed: 'This file type is not allowed.',
		latest_news: 'Latest news',
		more_news: 'More news',
		more_suggestions: 'More suggestions',
		popular_rooms: 'Popular rooms and discussions',
		watch: 'Watch',
		read: 'Read',
		event: 'Event',
		discussion: 'Discussion',
		roomCreated: 'Room created',
		discover: 'Discover rooms',
		video_call: 'Video call',
	},
	settings: {
		displayname: 'Nickname',
		userId: 'UserID',
		avatar: 'Avatar',
		avatar_changed: 'Avatar updated!.',
		displayname_changed: 'Nickname changed to `{0}`.',
		theme: 'Theme',
		theme_changed: 'Theme changed to `{0}`.',
		timeformat: 'Time format',
		language: 'Language',
		language_changed: 'Language changed to `{0}`.',
		title: 'Settings',
		notifications: 'Notifications',
		notifications_allow: 'Allow notifications',
		change_avatar: 'Change Avatar',
	},
	admin: {
		title: 'Admin tools',
		description: 'Create, edit, and delete (secured) rooms',
		add_room: 'Add a public room',
		add_secured_room: 'Add a (secured) room',
		name: 'Room name',
		topic: 'Description',
		room_type: 'Room type',
		room_type_placeholder: 'example: ph.plugin.xxx',
		edit_name: 'Change room name',
		edit_secured_room: 'Change secured room',
		added_room: 'Room added',
		no_rooms: 'No rooms',
		remove_room_sure: 'Are you sure to delete this public room?',
		secured_room: 'Secured room',
		no_secured_rooms: 'No secured rooms',
		secured_remove_sure: 'Are you sure to delete this secured room?',
		secured_description: 'Description of attributes needed',
		secured_yivi_attributes: 'Yivi Attributes',
		secured_attribute: 'Attribute',
		secured_values: 'Values',
		secured_profile: 'Profile',
		ask_disclosure_title: 'Ask a user to disclose information',
		ask_disclosure_choose_user: 'Ask a user to disclose information',
		ask_disclosure_user_title: 'User',
		ask_disclosure_where_title: 'Disclose to',
		ask_disclosure_where_room_title: 'Disclose to room',
		ask_disclosure_where_room_placeholder: '!room:...',
		ask_disclosure_where_public: 'a public room',
		ask_disclosure_where_private: 'the moderator',
		ask_disclosure_message_title: 'Message',
		ask_disclosure_message_placeholder: 'Please disclose the following information',
		ask_disclosure_message_to_recipient: 'To {0}:\n\n{1}\n\nThe following information is requested: {2}',
		disclosure_sign_message: 'To the moderator:\n\nThe requested information is disclosed.',
		disclosure_dialog_title: 'Please disclose information',
		room_call_permission: 'Everyone could start a call',
	},
	themes: {
		dark: 'Dark',
		light: 'Light',
		system: 'System',
	},
	timeformats: {
		format12: '12 hours',
		format24: '24 hours',
	},
	message: {
		send: 'Send',
		in_reply_to: 'In reply to:',
		notification: 'New message in hub',
		upload_file: 'Upload file',
		sign: {
			add_signature: 'Sign message',
			heading: 'Signing a message',
			info: "Go 'on the record' by signing your message with your information.",
			warning: 'A signed message can be shared. Do not include personal information and consider other users in this room.',
			selected_attributes: 'Your message will be signed with this information:',
			send: 'Sign & Send',
		},
		messageSigned: {
			heading: 'Signed message',
			info: 'A statement that is signed with Yivi attributes and can be shared outside the Hub.',
			verificationStatus: 'Signed messages are a work in progress. They are trustworthy, but are not yet cryptographically verified.',
		},
	},
	time: {
		today: 'Today',
		yesterday: 'Yesterday',
		daysago: '{0} days ago',
	},
	emoji: {
		clock: 'All',
		smiley: 'Smileys & People',
		bear: 'Animals & Nature',
		cup: 'Food & Drink',
		basketball: 'Travel & Places',
		house: 'Activities',
		lightbulb: 'Lifestyle',
		signs: 'Symbols',
		flag: 'Flags',
	},
	validation: {
		required: '`{0}` is required.',
		max_length: '`{0}` is too long, max length is {1} characters.',
		min_length: '`{0}` is too short, min length is {1} characters.',
	},
};

export { en };
