import { iconSizes } from './sizes';

/**
 * Every icon has a key and a svg code:
 *
 *  'key': `<svg code>....</svg>`
 *
 * Adding / changing icons here will reflect in all the UI and the histoire environment.
 *
 *
 * For icon sizes, see ./sizes.ts
 *
 *
 * Some icons are based on https://tailwindtoolbox.com/icons
 */

const icons: { [key: string]: string } = {
	empty: ``,
	home: `
        <path stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        `,
	circle: `
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        `,
	'pubhubs-home': `
        <circle cx="12" cy="12" r="11" fill="currentColor"/>
        <path d="M4.25306 12.2951L17.0548 0.626046L13.3499 17.5472L0.548216 29.2163L4.25306 12.2951Z" fill="black" stroke="black" stroke-linejoin="round" transform="scale(0.5) translate(15,9)"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
        `,
	close: `
        <path stroke="none" d="M0 0h24v24H0z"/>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
        `,
	plus: `
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
        `,
	remove: `
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
        `,
	check: `
        <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <path d="M9 12l2 2l4 -4" />
    `,
	'chevron-right': `
        <path stroke="none" d="M0 0h24v24H0z"/>
        <polyline points="9 6 15 12 9 18" />
    `,
	'chevron-down': `
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="6 9 12 15 18 9" />
        `,
	'chevron-up': `
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="6 15 12 9 18 15" />
        `,
	cog: `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        `,
	edit: `
        <path stroke="none" d="M0 0h24v24H0z"/>
        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
        <line x1="16" y1="5" x2="19" y2="8" />
        `,
	power: `
        <path stroke="none" d="M0 0h24v24H0z"/>
        <path d="M7 6a7.75 7.75 0 1 0 10 0" />
        <line x1="12" y1="4" x2="12" y2="12" />
        `,
	link: `
        <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />  <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
    `,
	unlink: `
        <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
        <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
        <line x1="16" y1="21" x2="16" y2="19" />
        <line x1="19" y1="16" x2="21" y2="16" />
        <line x1="3" y1="8" x2="5" y2="8" />
        <line x1="8" y1="3" x2="8" y2="5" />
        `,
	talk: `
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M21.641789,13.3147778 C22.0252911,18.8215755 17.7986006,23.5980192 12.204769,23.9755213 C9.20358535,24.1806892 6.41083623,23.0726829 4.41839164,21.1605054 L0,21.439507 L2.55933113,18.7477085 C1.88406065,17.5331016 1.46723996,16.1543438 1.35886435,14.6853188 C0.983717226,9.17852105 5.21036278,4.40212572 10.8042111,4.02461092 C16.3980593,3.64709478 21.2499534,7.80797997 21.6334556,13.3147778 L21.641789,13.3147778 Z" id="Path" fill="currentColor"></path>
        </g>
        `,
	room: `
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Vector" transform="translate(0.000000, 1.00000)">
            <path d="M21.641789,12.3147778 C22.0252911,17.8215755 17.7986006,22.5980192 12.204769,22.9755213 C9.20358535,23.1806892 6.41083623,22.0726829 4.41839164,20.1605054 L0,20.439507 L2.55933113,17.7477085 C1.88406065,16.5331016 1.46723996,15.1543438 1.35886435,13.6853188 C0.983717226,8.17852105 5.21036278,3.40212572 10.8042111,3.02461092 C16.3980593,2.64709478 21.2499534,6.80797997 21.6334556,12.3147778 L21.641789,12.3147778 Z" id="Path" fill="currentColor"></path>
            <path d="M4.0230087,9.31440598 C3.6690247,14.8212063 7.57054351,19.5975687 12.7341084,19.975071 C15.5044086,20.180239 18.082341,19.0723989 19.9215355,17.1602205 L24.0000438,17.4392222 L21.6375293,14.7473558 C22.2608665,13.5327317 22.6457022,12.15399 22.7457028,10.6849643 C23.0920382,5.17814741 19.1904644,0.401759933 14.0269162,0.0242446296 C8.86336806,-0.353271341 4.3846874,3.80760572 4.03070341,9.31440598 L4.0230087,9.31440598 Z" id="Path" stroke="currentColor" fill="#FFFFFF"></path>
        </g>
        </g>
        `,
	search: `
        <path stroke="none" d="M0 0h24v24H0z"/>
        <circle cx="10" cy="10" r="7" />
        <line x1="21" y1="21" x2="15" y2="15" />
        `,
	emoticon: `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        `,
	paperclip: `
        <path stroke="none" d="M0 0h24v24H0z"/>
        <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9 l6.5 -6.5" />
        `,
	lock: `
        <path d="M15.1176 4.48959L8.17454 1L1 4.48959C2.15718 9.2003 4.93443 16.0733 8.17454 17C11.6461 15.8416 14.269 9.2003 15.1176 4.48959Z" stroke-linejoin="round"/>
        `,
	'arrow-right': `
        <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="5" y1="12" x2="19" y2="12" />  <line x1="15" y1="16" x2="19" y2="12" />  <line x1="15" y1="8" x2="19" y2="12" />
        `,
	admin: `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"/>
        `,
	hamburgermenu: `
        <path d="M69 52.76L51.87 51.65C44.14 59.29 33.32 63.73 21.68 62.91C13.47 62.34 6.01 59.24 0 54.41V0H56.63C61.66 7.25 64.36 16.23 63.73 25.75C63.31 31.62 61.69 37.14 59.08 41.99L69 52.76Z" />
        <path d="M69 52.76L51.87 51.65C44.14 59.29 33.32 63.73 21.68 62.91C13.47 62.34 6.01 59.24 0 54.41V0H56.63C61.66 7.25 64.36 16.23 63.73 25.75C63.31 31.62 61.69 37.14 59.08 41.99L69 52.76Z"/>
        <path d="M19 22.01C19 21.46 19.45 21.01 20 21.01H38C38.55 21.01 39 21.46 39 22.01C39 22.56 38.55 23.01 38 23.01H20C19.45 23.01 19 22.56 19 22.01Z" />
        <path d="M19 29.01C19 28.46 19.45 28.01 20 28.01H38C38.55 28.01 39 28.46 39 29.01C39 29.56 38.55 30.01 38 30.01H20C19.45 30.01 19 29.56 19 29.01Z" />
        <path d="M19 36.01C19 35.46 19.45 35.01 20 35.01H38C38.55 35.01 39 35.46 39 36.01C39 36.56 38.55 37.01 38 37.01H20C19.45 37.01 19 36.56 19 36.01Z" />
        `,
	returnmenu: `
        <path d="M69 52.76L51.87 51.64C44.15 59.29 33.32 63.72 21.69 62.9C13.47 62.33 6.01 59.23 0 54.4V0H56.63C61.66 7.25 64.36 16.22 63.73 25.74C63.31 31.62 61.7 37.13 59.08 41.99L69 52.76Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2929 28.7073C13.9024 28.3168 13.9024 27.6836 14.2929 27.2931L20.6569 20.9291C21.0474 20.5386 21.6805 20.5386 22.0711 20.9291C22.4616 21.3196 22.4616 21.9528 22.0711 22.3433L17.4142 27.0002H47C47.5523 27.0002 48 27.4479 48 28.0002C48 28.5525 47.5523 29.0002 47 29.0002H17.4142L22.0711 33.657C22.4616 34.0476 22.4616 34.6807 22.0711 35.0713C21.6805 35.4618 21.0474 35.4618 20.6569 35.0713L14.2929 28.7073Z"/>
        `,
	reply: `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
        `,
	closingCross: `
        <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" />
        `,
	'lost-connection': `
        <line x1="1" y1="1" x2="23" y2="23" />  <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />  <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />  <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />  <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />  <line x1="12" y1="20" x2="12.01" y2="20" />
    `,
	refresh: `
        <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />  <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" />
    `,
	bin: `<path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />`,
	person: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>`,
	spinner: `<line x1="12" y1="2" x2="12" y2="6" />  <line x1="12" y1="18" x2="12" y2="22" />  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />  <line x1="2" y1="12" x2="6" y2="12" />  <line x1="18" y1="12" x2="22" y2="12" />  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />`,
	sign: `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        `,
	upload: `
        <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />  <polyline points="7 9 12 4 17 9" />  <line x1="12" y1="4" x2="12" y2="16" />
        `,
	warning: `
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />  <line x1="12" y1="9" x2="12" y2="13" />  <line x1="12" y1="17" x2="12.01" y2="17" />
        `,
	info: `
        <circle cx="12" cy="12" r="10" />  <line x1="12" y1="16" x2="12" y2="12" />  <line x1="12" y1="8" x2="12.01" y2="8" />
        `,
	download: `
        <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />  <polyline points="7 11 12 16 17 11" />  <line x1="12" y1="4" x2="12" y2="16" />
        `,
	single_user: `<svg  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>`,
	two_users: `<svg  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="9" cy="7" r="4" />  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" />  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>`,
	user_plus: `<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>`,
	tick: `<svg viewBox="0 0 50 50" width="24px" height="24px"><path d="M 11 4 C 7.101563 4 4 7.101563 4 11 L 4 39 C 4 42.898438 7.101563 46 11 46 L 39 46 C 42.898438 46 46 42.898438 46 39 L 46 15 L 44 17.3125 L 44 39 C 44 41.800781 41.800781 44 39 44 L 11 44 C 8.199219 44 6 41.800781 6 39 L 6 11 C 6 8.199219 8.199219 6 11 6 L 37.40625 6 L 39 4 Z M 43.25 7.75 L 23.90625 30.5625 L 15.78125 22.96875 L 14.40625 24.4375 L 23.3125 32.71875 L 24.09375 33.4375 L 24.75 32.65625 L 44.75 9.03125 Z"/></svg>`,
	filled_tick: `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="24px" height="24px" baseProfile="basic"><circle cx="24" cy="24" r="20" fill="#6be3a2"/><path fill="#324561" d="M22.5,33c-0.226,0-0.446-0.076-0.625-0.219l-7.5-6c-0.431-0.345-0.501-0.974-0.156-1.405	c0.347-0.431,0.975-0.501,1.406-0.156l6.667,5.334l9.889-14.126c0.316-0.454,0.94-0.562,1.393-0.246	c0.453,0.317,0.562,0.94,0.246,1.393l-10.5,15c-0.158,0.227-0.403,0.377-0.677,0.417C22.595,32.997,22.547,33,22.5,33z"/></svg>`,
	emoji_clock: `
        <svg viewBox="0 0 14 15" >
        <g clip-path="url(#clip0_2124_15282)">
        <path d="M7 14.2002C3.1 14.2002 0 11.1002 0 7.2002C0 3.3002 3.1 0.200195 7 0.200195C10.9 0.200195 14 3.3002 14 7.2002C14 11.1002 10.9 14.2002 7 14.2002ZM7 1.2002C3.7 1.2002 1 3.9002 1 7.2002C1 10.5002 3.7 13.2002 7 13.2002C10.3 13.2002 13 10.5002 13 7.2002C13 3.9002 10.3 1.2002 7 1.2002Z"/>
        <path d="M10 7.7002H7C6.7 7.7002 6.5 7.5002 6.5 7.2002V3.2002C6.5 3.0002 6.7 2.7002 7 2.7002C7.3 2.7002 7.5 3.0002 7.5 3.2002V6.7002H10C10.3 6.7002 10.5 6.9002 10.5 7.2002C10.5 7.5002 10.3 7.7002 10 7.7002Z"/>
        </g>
        <defs>
        <clipPath id="clip0_2124_15282">
        <rect width="14" height="15"/>
        </clipPath>
        </defs>
        </svg>
        `,
	emoji_smiley: `
        <svg viewBox="0 0 14 15">
        <g clip-path="url(#clip0_2124_15335)">
        <path d="M7 14.2002C3.1 14.2002 0 11.1002 0 7.2002C0 3.3002 3.1 0.200195 7 0.200195C10.9 0.200195 14 3.3002 14 7.2002C14 11.1002 10.9 14.2002 7 14.2002ZM7 1.2002C3.7 1.2002 1 3.9002 1 7.2002C1 10.5002 3.7 13.2002 7 13.2002C10.3 13.2002 13 10.5002 13 7.2002C13 3.9002 10.3 1.2002 7 1.2002Z"/>
        <path d="M5 6.7002C4.7 6.7002 4.5 6.5002 4.5 6.2002V4.2002C4.5 4.0002 4.7 3.7002 5 3.7002C5.3 3.7002 5.5 4.0002 5.5 4.2002V6.2002C5.5 6.5002 5.3 6.7002 5 6.7002Z" />
        <path d="M9 6.7002C8.7 6.7002 8.5 6.5002 8.5 6.2002V4.2002C8.5 4.0002 8.7 3.7002 9 3.7002C9.3 3.7002 9.5 4.0002 9.5 4.2002V6.2002C9.5 6.5002 9.3 6.7002 9 6.7002Z" />
        <path d="M9.8 8.2002H4.2C4.1 8.2002 4 8.3002 4 8.5002C4.2 9.5002 5.1 11.3002 7 11.3002C8.9 11.3002 9.7 9.6002 10 8.5002C10 8.3002 9.9 8.2002 9.8 8.2002Z" />
        </g>
        <defs>
        <clipPath id="clip0_2124_15335">
        <rect width="14" height="15"/>
        </clipPath>
        </defs>
        </svg>
        `,
	emoji_bear: `
        <svg  viewBox="0 0 17 15">
        <g clip-path="url(#clip0_2124_15305)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.70629 9.73493C2.52513 10.7874 2.54624 11.5968 2.69528 12.0158C2.78468 12.2671 3.01193 12.4942 3.43769 12.6838C3.86337 12.8733 4.42263 12.9945 5.04992 13.0657C6.02313 13.1763 7.05438 13.1582 7.85543 13.1442C8.09274 13.14 8.30984 13.1362 8.49926 13.1362C8.68908 13.1362 8.90656 13.14 9.1442 13.1442C9.94602 13.1582 10.9774 13.1762 11.9505 13.0657C12.5778 12.9945 13.1369 12.8733 13.5625 12.6838C13.9881 12.4943 14.2153 12.2671 14.3047 12.0158C14.4538 11.5968 14.4748 10.7875 14.2935 9.73499C14.1165 8.70776 13.761 7.52973 13.2392 6.41894C12.1722 4.14741 10.531 2.38551 8.49926 2.38551C6.46754 2.38551 4.82676 4.14735 3.76012 6.41888C3.23852 7.52965 2.88311 8.70769 2.70629 9.73493ZM2.78532 5.96114C3.88818 3.6125 5.7975 1.30859 8.49926 1.30859C11.201 1.30859 13.1107 3.61244 14.2139 5.96108C14.7773 7.16038 15.1617 8.43103 15.3548 9.55217C15.5436 10.6481 15.5648 11.6868 15.3194 12.3767C15.0932 13.0124 14.571 13.4136 14.0006 13.6676C13.4301 13.9216 12.7466 14.0592 12.072 14.1358C11.0196 14.2553 9.88167 14.235 9.07825 14.2206C8.85694 14.2166 8.66102 14.2131 8.49926 14.2131C8.33789 14.2131 8.14234 14.2166 7.92138 14.2206C7.11877 14.2349 5.98092 14.2553 4.92841 14.1358C4.2538 14.0592 3.57025 13.9216 2.99969 13.6676C2.42922 13.4136 1.90681 13.0125 1.68065 12.3767C1.43523 11.6868 1.45634 10.6481 1.64498 9.55224C1.83796 8.4311 2.22216 7.16045 2.78532 5.96114Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3761 1.51882C12.8759 1.86028 12.4563 2.54266 12.2319 3.10359C12.1214 3.3797 11.8081 3.51399 11.532 3.40353C11.2559 3.29308 11.1216 2.97971 11.232 2.7036C11.4907 2.05693 12.0131 1.14531 12.7689 0.62938C13.1599 0.362511 13.6384 0.185537 14.1791 0.241936C14.718 0.298157 15.2401 0.578108 15.7358 1.07373C16.2314 1.56935 16.5114 2.09146 16.5677 2.63039C16.6241 3.17104 16.4471 3.64961 16.1802 4.04056C15.6642 4.79637 14.7525 5.31884 14.1058 5.57757C13.8297 5.68803 13.5163 5.55375 13.4059 5.27764C13.2954 5.00154 13.4297 4.68816 13.7058 4.5777C14.2668 4.35326 14.9493 3.93362 15.2908 3.43338C15.4526 3.1963 15.5202 2.96837 15.4966 2.74214C15.4728 2.51421 15.3482 2.2091 14.9743 1.83526C14.6004 1.46141 14.2953 1.33682 14.0673 1.31304C13.8411 1.28944 13.6131 1.357 13.3761 1.51882Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.6259 1.51882C4.1261 1.86028 4.54569 2.54266 4.77008 3.10359C4.88053 3.3797 5.1939 3.51399 5.47002 3.40353C5.74613 3.29308 5.88041 2.97971 5.76996 2.7036C5.51127 2.05693 4.98886 1.14531 4.23306 0.62938C3.84212 0.362511 3.36355 0.185537 2.82292 0.241936C2.284 0.298157 1.76187 0.578108 1.26621 1.07373C0.770538 1.56935 0.490549 2.09146 0.43432 2.63039C0.377913 3.17104 0.554912 3.64961 0.821798 4.04056C1.33777 4.79637 2.24946 5.31884 2.89616 5.57757C3.17227 5.68803 3.48565 5.55375 3.59611 5.27764C3.70657 5.00154 3.57229 4.68816 3.29618 4.5777C2.7352 4.35326 2.05273 3.93362 1.71123 3.43338C1.54939 3.1963 1.48183 2.96837 1.50543 2.74214C1.52921 2.51421 1.6538 2.2091 2.02767 1.83526C2.40155 1.46141 2.70669 1.33682 2.93466 1.31304C3.16091 1.28944 3.38884 1.357 3.6259 1.51882Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.50134 9.25098C8.57569 9.25098 8.63596 9.31125 8.63596 9.38559C8.63596 9.73514 8.68885 10.2569 8.84338 10.6861C9.00148 11.1253 9.23982 11.4048 9.57826 11.4048C9.96516 11.4048 10.194 11.2466 10.3306 11.0569C10.4721 10.8604 10.5206 10.6205 10.5206 10.4625C10.5206 10.3882 10.5808 10.3279 10.6552 10.3279C10.7295 10.3279 10.7898 10.3882 10.7898 10.4625C10.7898 10.6635 10.7306 10.9621 10.549 11.2142C10.3625 11.4733 10.0529 11.674 9.57826 11.674C9.05517 11.674 8.75505 11.2356 8.59007 10.7773C8.55601 10.6827 8.5266 10.5846 8.50134 10.4851C8.47609 10.5846 8.44667 10.6827 8.41262 10.7773C8.24764 11.2356 7.94752 11.674 7.42442 11.674C6.94978 11.674 6.64014 11.4733 6.45364 11.2142C6.27209 10.9621 6.21289 10.6635 6.21289 10.4625C6.21289 10.3882 6.27316 10.3279 6.34751 10.3279C6.42185 10.3279 6.48212 10.3882 6.48212 10.4625C6.48212 10.6205 6.53061 10.8604 6.67213 11.0569C6.80871 11.2466 7.03753 11.4048 7.42442 11.4048C7.76286 11.4048 8.0012 11.1253 8.1593 10.6861C8.31384 10.2569 8.36673 9.73514 8.36673 9.38559C8.36673 9.31125 8.427 9.25098 8.50134 9.25098Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.34705 5.61621C6.64444 5.61621 6.88551 5.85729 6.88551 6.15467V7.23159C6.88551 7.52897 6.64444 7.77005 6.34705 7.77005C6.04967 7.77005 5.80859 7.52897 5.80859 7.23159V6.15467C5.80859 5.85729 6.04967 5.61621 6.34705 5.61621Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6556 5.61621C10.953 5.61621 11.1941 5.85729 11.1941 6.15467V7.23159C11.1941 7.52897 10.953 7.77005 10.6556 7.77005C10.3583 7.77005 10.1172 7.52897 10.1172 7.23159V6.15467C10.1172 5.85729 10.3583 5.61621 10.6556 5.61621Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.57766 8.84705C9.57766 9.14444 9.33659 9.38551 9.03921 9.38551H7.96229C7.6649 9.38551 7.42383 9.14444 7.42383 8.84705C7.42383 8.54967 7.6649 8.30859 7.96229 8.30859H9.03921C9.33659 8.30859 9.57766 8.54967 9.57766 8.84705Z" />
        </g>
        <defs>
        <clipPath id="clip0_2124_15305">
        <rect width="17" height="15"/>
        </clipPath>
        </defs>
        </svg>
        `,
	emoji_cup: `
        <svg  viewBox="0 0 15 13">
        <g clip-path="url(#clip0_2124_15271)">
        <path d="M6 12.7002C1.6 12.7002 0.5 10.0002 0.5 8.5002V1.2002C0.5 1.0002 0.7 0.700195 1 0.700195H11C11.3 0.700195 11.5 0.900195 11.5 1.2002V8.5002C11.5 10.0002 10.4 12.7002 6 12.7002ZM1.5 1.7002V8.5002C1.5 9.6002 2.4 11.7002 6 11.7002C9.6 11.7002 10.5 9.6002 10.5 8.5002V1.7002H1.5Z"/>
        <path d="M10.5 3.7002H1.5V4.7002H10.5V3.7002Z"/>
        <path d="M11.5 7.7002V6.7002C11.7 6.7002 13.5 6.7002 13.5 5.7002C13.5 4.7002 11.7 4.7002 11.5 4.7002V3.7002C13 3.7002 14.5 4.2002 14.5 5.7002C14.5 7.2002 13 7.7002 11.5 7.7002Z"/>
        <path d="M4.00078 8.5C3.90078 8.5 3.80078 8.4 3.80078 8.3V7.3C3.80078 7.1 3.90078 7 4.00078 7C4.10078 7 4.20078 7.1 4.20078 7.2V8.2C4.20078 8.4 4.10078 8.5 4.00078 8.5Z"/>
        <path d="M3.00078 9.5C2.90078 9.5 2.80078 9.4 2.80078 9.3V6.3C2.80078 6.1 2.90078 6 3.00078 6C3.10078 6 3.20078 6.1 3.20078 6.2V9.2C3.20078 9.4 3.10078 9.5 3.00078 9.5Z"/>
        </g>
        <defs>
        <clipPath id="clip0_2124_15271">
        <rect width="15" height="13"/>
        </clipPath>
        </defs>
        </svg>
        `,
	emoji_basketball: `
        <svg  viewBox="0 0 14 15">
        <g clip-path="url(#clip0_2124_15287)">
        <path d="M7 14.2002C3.1 14.2002 0 11.1002 0 7.2002C0 3.3002 3.1 0.200195 7 0.200195C10.9 0.200195 14 3.3002 14 7.2002C14 11.1002 10.9 14.2002 7 14.2002ZM7 1.2002C3.7 1.2002 1 3.9002 1 7.2002C1 10.5002 3.7 13.2002 7 13.2002C10.3 13.2002 13 10.5002 13 7.2002C13 3.9002 10.3 1.2002 7 1.2002Z"/>
        <path d="M3.00045 12.5998C2.90045 12.5998 2.80045 12.5998 2.80045 12.4998C2.60045 12.3998 2.60045 12.0998 2.70045 11.9998C3.40045 11.1998 4.60045 9.09982 4.60045 7.19982C4.60045 5.29982 3.70045 3.19982 3.20045 2.39982C3.10045 2.19982 3.10045 1.99982 3.30045 1.89982C3.50045 1.79982 3.70045 1.89982 3.80045 1.99982C4.30045 2.89982 5.40045 5.09982 5.40045 7.19982C5.40045 9.29982 4.00045 11.4998 3.30045 12.3998C3.20045 12.5998 3.10045 12.5998 3.00045 12.5998Z"/>
        <path d="M10.9996 12.5997C10.8996 12.5997 10.7996 12.5997 10.6996 12.4997C9.99961 11.5997 8.59961 9.29967 8.59961 7.19967C8.59961 5.09967 9.59961 2.89967 10.1996 1.99967C10.2996 1.79967 10.4996 1.79967 10.6996 1.89967C10.8996 1.99967 10.8996 2.19967 10.7996 2.39967C10.2996 3.19967 9.39961 5.29967 9.39961 7.19967C9.39961 9.09967 10.6996 11.0997 11.2996 11.9997C11.3996 12.1997 11.3996 12.3997 11.1996 12.4997C11.1996 12.5997 11.0996 12.5997 10.9996 12.5997Z"/>
        <path d="M6.99961 13.6004C6.79961 13.6004 6.59961 13.4004 6.59961 13.2004V1.20039C6.59961 1.00039 6.79961 0.900391 6.99961 0.900391C7.19961 0.900391 7.39961 1.00039 7.39961 1.20039V13.2004C7.39961 13.4004 7.19961 13.6004 6.99961 13.6004Z"/>
        <path d="M12.9996 7.60039H0.999609C0.799609 7.60039 0.599609 7.40039 0.599609 7.20039C0.599609 7.00039 0.799609 6.90039 0.999609 6.90039H12.9996C13.1996 6.90039 13.3996 7.10039 13.3996 7.30039C13.3996 7.50039 13.1996 7.60039 12.9996 7.60039Z"/>
        </g>
        <defs>
        <clipPath id="clip0_2124_15287">
        <rect width="14" height="15"/>
        </clipPath>
        </defs>
        </svg>
        `,
	emoji_house: `
        <svg  viewBox="0 0 12 14">
        <g clip-path="url(#clip0_2124_15313)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.2415 0.349208C5.6406 -0.116403 6.36092 -0.116402 6.76002 0.349209L11.6729 6.08091C12.2289 6.72959 11.768 7.7317 10.9136 7.7317H1.08787C0.233518 7.7317 -0.227393 6.72959 0.328613 6.08091L5.2415 0.349208ZM6.00076 1L1.08787 6.7317H10.9136L6.00076 1Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 12.7314V7.23145H1.5V12.7314H10.5V7.23145H11.5V12.7314C11.5 13.2837 11.0523 13.7314 10.5 13.7314H1.5C0.947715 13.7314 0.5 13.2837 0.5 12.7314Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 10.3314C3 10.0001 3.26863 9.73145 3.6 9.73145H4.4C4.73137 9.73145 5 10.0001 5 10.3314V12.6314C5 12.9628 4.73137 13.2314 4.4 13.2314H3.6C3.26863 13.2314 3 12.9628 3 12.6314V10.3314Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 1.23145H3.5V3.73145H2.5V1.23145Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7 9.83145C7 9.50007 7.26863 9.23145 7.6 9.23145H8.4C8.73137 9.23145 9 9.50007 9 9.83145V10.6314C9 10.9628 8.73137 11.2314 8.4 11.2314H7.6C7.26863 11.2314 7 10.9628 7 10.6314V9.83145Z"/>
        </g>
        <defs>
        <clipPath id="clip0_2124_15313">
        <rect width="12" height="14"/>
        </clipPath>
        </defs>
        </svg>
        `,
	emoji_lightbulb: `
        <svg viewBox="0 0 10 14">
        <g clip-path="url(#clip0_2124_15319)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25195 1.12C3.28525 1.12 1.69092 2.62432 1.69092 4.48H0.503906C0.503906 2.00576 2.62968 0 5.25195 0C7.87423 0 10 2.00576 10 4.48H8.81299C8.81299 2.62432 7.21866 1.12 5.25195 1.12Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.59066 8.1138C0.977609 7.36842 0.503906 6.26117 0.503906 4.48047H1.69092C1.69092 6.05977 2.10516 6.91252 2.52842 7.42714C2.7456 7.69119 2.98131 7.88614 3.21097 8.05497C3.28701 8.11087 3.35342 8.15761 3.42141 8.20546C3.4639 8.23536 3.507 8.26569 3.55346 8.29897C3.66151 8.37636 3.78177 8.46569 3.88647 8.56449C4.23412 8.89251 4.45048 9.20697 4.56006 9.58142C4.65771 9.91509 4.65761 10.2654 4.65751 10.6081C4.65751 10.6189 4.65751 10.6297 4.65751 10.6405H3.4705C3.4705 10.2469 3.46537 10.0487 3.41587 9.87952C3.37522 9.74063 3.29299 9.58843 3.04713 9.35645C3.00346 9.31524 2.93839 9.26457 2.83572 9.19103C2.80494 9.16899 2.76853 9.14333 2.72889 9.11539C2.6527 9.0617 2.56456 8.99958 2.48143 8.93847C2.21118 8.7398 1.89164 8.47974 1.59066 8.1138Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00882 7.39144C8.41832 6.89298 8.81271 6.06642 8.81234 4.48072L9.99935 4.48047C9.99977 6.25477 9.55285 7.34011 8.94698 8.0776C8.65018 8.43888 8.33158 8.69623 8.05804 8.8977C7.96064 8.96944 7.87689 9.02905 7.80342 9.08133C7.65027 9.19033 7.54181 9.26753 7.44744 9.35657C7.07607 9.70698 7.02008 9.88487 7.00485 9.97541C6.99507 10.0335 6.99526 10.0981 7.00465 10.2083C7.00628 10.2275 7.00835 10.2492 7.01063 10.2731C7.01992 10.3707 7.03262 10.5041 7.03262 10.6406H5.84561C5.84561 10.5589 5.8392 10.4906 5.8308 10.4011C5.82786 10.3698 5.82469 10.336 5.82146 10.2981C5.81008 10.1646 5.80006 9.99266 5.83252 9.79975C5.90178 9.38828 6.14012 9.00617 6.60809 8.56461C6.76473 8.41682 6.97386 8.26796 7.15758 8.13717C7.21793 8.09422 7.27554 8.05321 7.32765 8.01483C7.56533 7.83978 7.79793 7.64814 8.00882 7.39144Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4707 11.7596V10.6396H4.65771V11.1996H5.84473V10.6396H7.03174V11.7596C7.03174 12.0689 6.76602 12.3196 6.43823 12.3196H4.06421C3.73642 12.3196 3.4707 12.0689 3.4707 11.7596Z"/>
        <path d="M3.4707 13.4399C3.4707 13.1306 3.73642 12.8799 4.06421 12.8799H6.43823C6.76602 12.8799 7.03174 13.1306 7.03174 13.4399C7.03174 13.7492 6.76602 13.9999 6.43823 13.9999H4.06421C3.73642 13.9999 3.4707 13.7492 3.4707 13.4399Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.06421 12.8799C3.73642 12.8799 3.4707 13.1306 3.4707 13.4399C3.4707 13.7492 3.73642 13.9999 4.06421 13.9999H6.43823C6.76602 13.9999 7.03174 13.7492 7.03174 13.4399C7.03174 13.1306 6.76602 12.8799 6.43823 12.8799H4.06421Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.8545 4.84178C3.97038 4.73243 4.15828 4.73243 4.27417 4.84178L5.25134 5.76379L6.22852 4.84178C6.34441 4.73243 6.5323 4.73243 6.64819 4.84178C6.76408 4.95112 6.76408 5.12841 6.64819 5.23776L5.46118 6.35776C5.34529 6.4671 5.1574 6.4671 5.04151 6.35776L3.8545 5.23776C3.73861 5.12841 3.73861 4.95112 3.8545 4.84178Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25183 5.87988C5.41572 5.87988 5.54858 6.00524 5.54858 6.15988V7.83988C5.54858 7.99452 5.41572 8.11988 5.25183 8.11988C5.08794 8.11988 4.95508 7.99452 4.95508 7.83988V6.15988C4.95508 6.00524 5.08794 5.87988 5.25183 5.87988Z"/>
        </g>
        <defs>
        <clipPath id="clip0_2124_15319">
        <rect width="10" height="14"/>
        </clipPath>
        </defs>
        </svg>
        `,
	emoji_signs: `
        <svg  viewBox="0 0 18 13">
        <g clip-path="url(#clip0_2124_15298)">
        <path d="M16 13H2C0.9 13 0 12.1 0 11V2C0 0.9 0.9 0 2 0H16C17.1 0 18 0.9 18 2V11C18 12.1 17.1 13 16 13ZM2 1C1.4 1 1 1.4 1 2V11C1 11.6 1.4 12 2 12H16C16.6 12 17 11.6 17 11V2C17 1.4 16.6 1 16 1H2Z"/>
        <path d="M6.89922 10.0002C6.69922 10.0002 6.49922 9.8002 6.59922 9.6002L7.59922 3.0002C7.59922 2.8002 7.79922 2.7002 7.89922 2.7002C8.09922 2.7002 8.29922 2.9002 8.19922 3.1002L7.19922 9.7002C7.19922 9.9002 7.09922 10.0002 6.89922 10.0002ZM3.59922 8.0002C3.39922 8.0002 3.19922 7.80019 3.19922 7.60019C3.19922 7.4002 3.39922 7.3002 3.59922 7.3002H8.29922C8.49922 7.3002 8.69922 7.5002 8.69922 7.7002C8.59922 7.9002 8.49922 8.0002 8.29922 8.0002H3.59922ZM4.29922 10.0002C4.09922 10.0002 3.99922 9.8002 3.99922 9.6002L5.09922 3.0002C5.09922 2.8002 5.29922 2.7002 5.39922 2.7002C5.59922 2.7002 5.79922 2.9002 5.69922 3.1002L4.69922 9.7002C4.69922 9.9002 4.49922 10.0002 4.29922 10.0002ZM3.99922 5.5002C3.79922 5.5002 3.59922 5.3002 3.69922 5.0002C3.69922 4.8002 3.89922 4.7002 4.09922 4.7002H8.79922C8.99922 4.7002 9.19922 4.9002 9.19922 5.1002C9.19922 5.3002 8.99922 5.4002 8.79922 5.4002H3.99922V5.5002Z"/>
        <path d="M13.5008 2.7002C13.8008 2.7002 14.0008 2.9002 14.0008 3.2002L13.9008 7.5002C13.9008 7.7002 13.7008 7.9002 13.5008 7.9002C13.3008 7.9002 13.1008 7.7002 13.1008 7.5002L13.0008 3.2002C13.0008 2.9002 13.2008 2.7002 13.5008 2.7002ZM13.5008 10.1002C13.3008 10.1002 13.2008 10.0002 13.0008 9.9002C12.9008 9.8002 12.8008 9.60019 12.8008 9.4002C12.8008 9.2002 12.9008 9.10019 13.0008 8.9002C13.1008 8.8002 13.3008 8.7002 13.5008 8.7002C13.7008 8.7002 13.8008 8.8002 14.0008 8.9002C14.1008 9.0002 14.2008 9.2002 14.2008 9.4002C14.2008 9.5002 14.2008 9.6002 14.1008 9.7002C14.0008 9.8002 13.9008 9.9002 13.8008 10.0002C13.7008 10.0002 13.6008 10.1002 13.5008 10.1002Z"/>
        </g>
        <defs>
        <clipPath id="clip0_2124_15298">
        <rect width="18" height="13"/>
        </clipPath>
        </defs>
        </svg>
        `,
	emoji_flag: `
        <svg viewBox="0 0 9 15">
        <g clip-path="url(#clip0_2124_15328)">
        <path d="M1 14.5C0.7 14.5 0.5 14.3 0.5 14V2C0.5 1.7 0.7 1.5 1 1.5C1.3 1.5 1.5 1.7 1.5 2V14C1.5 14.3 1.3 14.5 1 14.5Z"/>
        <path d="M2.8 7.19996C2.1 7.19996 1.4 6.89996 0.7 6.39996C0.6 6.29996 0.5 6.19996 0.5 5.99996V1.49996C0.5 1.29996 0.6 1.09996 0.8 1.09996C0.9 0.999961 1.1 0.999961 1.3 1.09996C1.4 1.19996 1.5 1.29996 1.6 1.39996C2.2 1.89996 2.9 2.49996 4.2 1.59996C5.9 0.499961 7.7 0.999961 8.4 1.59996C8.6 1.79996 8.6 2.09996 8.4 2.29996C8.2 2.49996 7.9 2.49996 7.7 2.29996C7.3 2.09996 6.1 1.49996 4.8 2.39996C3.3 3.39996 2.2 2.99996 1.5 2.49996V5.69996C2.2 6.19996 3 6.49996 4.2 5.59996C5.2 4.89996 6.1 4.89996 6.7 4.99996C7.6 5.19996 8.2 5.79996 8.5 6.29996C8.6 6.49996 8.5 6.79996 8.3 6.99996C8 7.09996 7.7 6.99996 7.6 6.69996C7.4 6.49996 7 6.09996 6.5 5.99996C5.9 5.89996 5.3 5.99996 4.8 6.39996C4.1 6.89996 3.4 7.19996 2.8 7.19996Z"/>
        <path d="M8 7C7.7 7 7.5 6.8 7.5 6.5V2C7.5 1.7 7.7 1.5 8 1.5C8.3 1.5 8.5 1.7 8.5 2V6.5C8.5 6.8 8.3 7 8 7Z"/>
        </g>
        <defs>
        <clipPath id="clip0_2124_15328">
        <rect width="9" height="15"/>
        </clipPath>
        </defs>
        </svg>
        `,
	message: `
        <svg class="h-32 w-32 text-gray-700"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />  <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" /></svg>`,
	mention: `
        <svg class="h-32 w-32 text-gray-700"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
</svg>`,
	hub_fallback: `
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.412 15.655 9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457 3 3m5.457 5.457 7.086 7.086m0 0L21 21" />
`,
};

export { icons, iconSizes as sizes };
