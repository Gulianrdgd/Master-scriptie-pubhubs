import * as sdk from 'matrix-js-sdk';
import {LoginResponse, MatrixClient} from 'matrix-js-sdk';

import { User, useUser, useDialog } from '@/store/store';

class Authentication {
	private user = useUser();

	private loginToken: string;
	private baseUrl: string;
	private clientUrl: string;
	private client!: MatrixClient;

	constructor() {
		// @ts-ignore
		this.baseUrl = _env.HUB_URL;
		this.loginToken = '';
		this.clientUrl = location.protocol + '//' + location.host + location.pathname;
	}

	/**
	 * Store & Fetch locally saved access_token
	 */

	private _storeAuth(response: LoginResponse) {
		const auth = {
			baseUrl: this.baseUrl,
			accessToken: response.access_token,
			userId: response.user_id,
			deviceId: response.device_id,
			loginTime: String(Date.now()),
		};
		this.user.setUser(new User(auth.userId));
		localStorage.setItem('pubhub', JSON.stringify(auth));
	}

	private _fetchAuth() {
		let auth = null;
		const stored = localStorage.getItem('pubhub');
		if (stored) {
			auth = JSON.parse(stored);
			if (auth) {
				this.user.setUser(new User(auth.userId));
			}
		}
		return auth;
	}

	private _clearAuth() {
		localStorage.removeItem('pubhub');
	}

	public getAccessToken(): string {
		const auth = this._fetchAuth();
		return auth.accessToken;
	}

	/**
	 * Login is handled by global PupHubs server via a SSO redirect
	 */

	public redirectToPubHubsLogin() {
		this.client = sdk.createClient({
			baseUrl: this.baseUrl,
			useE2eForGroupCall: true,
			useLivekitForGroupCalls: true,
		});
		this.baseUrl = window.location.href;
		const ssoURL = this.client.getSsoLoginUrl(this.baseUrl);
		window.location.replace(ssoURL);
	}

	/**
	 * Actual login method
	 */

	login() {
		this.user = useUser();
		return new Promise((resolve, reject) => {
			// First check if we have an accesstoken stored

			const auth = this._fetchAuth();
			if (auth !== null && auth.baseUrl === this.baseUrl && auth.deviceId) {
				// Start client with token
				const auth = this._fetchAuth();
				auth.timelineSupport = true;
				this.client = sdk.createClient({... auth,
					useE2eForGroupCall: true,
					useLivekitForGroupCalls: true,
				});
				console.log(auth.deviceId)
				this.client.deviceId = auth.deviceId;

			} else {
				// Start a clean client
				this.client = sdk.createClient({
					baseUrl: this.baseUrl,
					timelineSupport: true,
					useE2eForGroupCall: true,
					useLivekitForGroupCalls: true,
				});
			}

			// Check if we are logged in already
			if (!this.client.isLoggedIn()) {
				// First check if we came back from PubHubs login flow with a loginToken
				if (this.loginToken === '') {
					const urlParams = new URLSearchParams(window.location.search);
					const loginTokenParam = urlParams.get('loginToken');
					if (typeof loginTokenParam === 'string') {
						this.loginToken = loginTokenParam;
					}
				}

				//  Redirect to PubHubs login if we realy don't have a token
				if (this.loginToken === '') {
					this.redirectToPubHubsLogin();
				} else {
					this.client.loginWithToken(this.loginToken).then(
						(response) => {
							window.history.pushState('', '', '/');
							this._storeAuth(response as LoginResponse);
							if(response.device_id) {
								this.client.deviceId = response.device_id;
							}
							resolve(this.client);
						},
						(error) => {
							const err = error.data;
							const dialog = useDialog();

							if (typeof error === 'string' && error.indexOf('Invalid login token') < 0) {
								dialog.confirm('Server Error', error).then(() => {
									reject(error);
								});
							} else if (error.data.errcode === 'M_LIMIT_EXCEEDED') {
								const message = `Too much login attempts.Try again in ${[Math.round(err.retry_after_ms / 1000)]} seconds.`;
								dialog.confirm('Server Error', message).then(() => {
									reject(error);
								});
							} else {
								console.error(error);
							}

							reject(error);
						},
					);
				}
			} else {
				if (this.client.baseUrl === this.baseUrl) {
					resolve(this.client);
				} else {
					resolve(false);
				}
			}
		});
	}

	public updateLoggedInStatusBasedOnGlobalStatus(globalLoginTime: string) {
		const pubhub = localStorage.getItem('pubhub');

		if (pubhub) {
			const loginTime = JSON.parse(pubhub).loginTime;
			// Either we get no global time (empty string), so we know it's not logged in, or we get a global login time (in milliseconds), and we check if it's
			// before ours (in micro seconds).
			if (!globalLoginTime || parseInt(globalLoginTime) * 1000 > parseInt(loginTime)) {
				this.logout();
			}
		}
	}

	logout() {
		this._clearAuth();
		window.location.replace(this.clientUrl);
	}

	getBaseUrl() {
		return this.baseUrl;
	}
}

export { Authentication };