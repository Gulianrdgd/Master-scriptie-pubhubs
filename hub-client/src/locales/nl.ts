const nl = {
	dialog: {
		ok: 'Ok',
		cancel: 'Annuleer',
		close: 'Sluiten',
		yes: 'Ja',
		no: 'Nee',
		submit: 'Invoeren',
		title_sure: 'Weet je het zeker?',
	},
	errors: {
		error: 'Helaas, er is een fout opgetreden. Neem contact op met de developers.\n\n {0}',
		server: 'Fout van de server',
		M_LIMIT_EXCEEDED: 'Te veel inlogpogingen achter elkaar. Probeer het over {0} seconden nog eens.',
		not_send_offline: 'Geen internet connectie. Dit bericht is niet verstuurd.',
		resend: 'Verzend opnieuw',
	},
	file: {
		file: 'Bestand',
		upload_file: 'upload bestand',
		upload_message: 'Wil je uploaden',
	},
	forms: {
		submit: 'Invoeren',
	},
	home: {
		welcome: 'Welkom bij <a href="https://pubhubs.net">PubHubs</a>.<br>PubHubs is een community netwerk gebaseerd op publieke waarden.',
		highlighted_hubs: 'Uitgelichte Hubs',
	},
	login: {
		login: 'Login',
		global_login: 'Login bij PubHubs',
	},
	logout: {
		logout: 'Logout',
		logout_sure: 'Weet je zeker dat je wilt uitloggen?',
	},
	menu: {
		calender: 'Kalender',
		home: 'Home',
		logout: 'Uitloggen',
		name: 'Hier komt een naam',
		private_rooms: '@:rooms.private_rooms',
		rooms: '@:rooms.rooms',
		settings: 'Instellingen',
		tool: 'Gereedschap',
	},
	others: {
		nop: 'Deze functionaleit is nog niet gerealiseerd.',
		search: 'zoeken',
	},
	rooms: {
		me: 'Ik',
		leave_sure: 'Weet je zeker dit gesprek wilt verlaten?',
		new_message: 'Typ hier je chatbericht',
		members: 'leden',
		member: 'lid',
		private_room: 'Privé gesprek',
		private_members: 'Met {0},{1}',
		private_rooms: 'Privé gesprekken',
		private_topic: 'Een privégesprek tussen',
		private_add: 'Nieuw privégesprek',
		private_search_user: 'Zoek persoon, typen kan meer resultaten geven.',
		rooms: 'Gesprekken',
		join_room: 'Wordt lid van een gesprek',
		add_room: 'Voeg gesprek toe',
		name: 'Naam van gesprek',
		filter: 'Filter gesprekken',
		title: '{0}',
		access_denied: 'Toegang geweigerd',
		secure_room_message: 'De beveiligde kamer vereist dat u uw gegevens vrijgeeft om toegang te krijgen tot de kamer.',
		secure_room_attribute_info: 'Je hebt de Yivi-app nodig om je informatie vrij te geven',
		secured_room_error: 'Het spijt ons, maar het lijkt erop dat u geen toegang heeft tot de kamer! Controleer uw gegevens in de Yivi-app',
		admin_badge: 'Admin',
		upload_error: 'Fout tijdens uploaden',
		upload_not_allowed: 'Dit type bestand is niet toegestaan.',
		latest_news: 'Laatste nieuws',
		more_news: 'Meer nieuws',
		more_suggestions: 'Meer suggesties',
		popular_rooms: 'Populaire gesprekken en discussies',
		watch: 'Kijk',
		read: 'Lees',
		event: 'Evenement',
		discussion: 'Discussie',
		video_call: 'Videogesprek',
	},
	settings: {
		displayname: 'Bijnaam',
		displayname_changed: 'Bijnaam gewijzigd in `{0}`.',
		avatar_changed: 'Avatar bijgewerkt! ',
		theme: 'Thema',
		theme_changed: 'Thema gewijzigd in `{0}`.',
		language: 'Taal',
		language_changed: 'Taal gewijzigd in `{0}`.',
		title: 'Instellingen',
		notifications: 'Notificaties',
		notifications_allow: 'Notificaties toestaan',
		change_avatar: 'Avatar aanpassen',
	},
	admin: {
		title: 'Admin',
		description: 'Maak en verwijder hier (beveiligde) gesprekken',
		add_room: 'Voeg openbaar gesprek toe',
		add_secured_room: 'Voeg beveiligd gesprek toe',
		name: 'Naam van gesprek',
		room_type: 'Type gesprek',
		room_type_placeholder: 'bijvoorbeeld: ph.plugin.xxx',
		edit_name: 'Pas naam van gesprek aan',
		edit_secured_room: 'Pas beveiligd gesprek aan',
		added_room: 'Gesprek toegevoegd',
		no_rooms: 'Geen kamers',
		remove_room_sure: 'Weet je zeker dat je dit gesprek wilt verwijderen?',
		secured_room: 'Beveiligde kamer',
		no_secured_rooms: 'Geen beveiligde kamers',
		secured_remove_sure: 'Weet je zeker dat je dit beveiligde gesprek wilt verwijderen?',
		secured_description: 'Omschrijving',
		secured_yivi_attributes: 'Yivi Attributen',
		secured_attribute: 'Attribuut',
		secured_values: 'Waarden',
		secured_profile: 'Profiel',
	},
	themes: {
		dark: 'Donker',
		light: 'Licht',
		system: 'Systeem',
	},
	message: {
		send: 'Verstuur',
		in_reply_to: 'Antwoord op:',
		notification: 'Nieuw bericht in hub',
		upload_file: 'Upload bestand',
		sign: {
			add_signature: 'Onderteken bericht',
			heading: 'Een bericht ondertekenen',
			info: 'Laat zien dat je achter dit bericht staat door het te ondertekenen met jouw gegegevens.',
			warning: 'Een ondertekend bericht kan worden gedeeld. Zet er geen persoonlijke informatie in en denk aan de medegebruikers in deze kamer.',
			selected_attributes: 'Met deze informatie onderteken jij je bericht:',
			send: 'Onderteken & Verstuur',
		},
		messageSigned: {
			heading: 'Ondertekend bericht',
			info: 'Een verklaring dat ondertekend is met Yivi attributen en gedeeld kan worden buiten de Hub.',
			verificationStatus: 'Ondertekende berichten zijn nog in ontwikkeling. Ze zijn betrouwbaar, maar worden nog niet cryptographisch geverifieerd.',
		},
	},
};

export { nl };
