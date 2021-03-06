import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { CONFIG } from './config';

import { AppGlobalService } from './app-global.service';
import { MessageService } from './admin/shared/message.service';


@Injectable()
export class AuthService {

	constructor(private _http: Http, private _gs: AppGlobalService, private _msgService: MessageService) {
	}

	getAuthUser() {
		return this._http.get(CONFIG.API_BASE + '/user', this._gs.data.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			});
	}

	login(email: string, password: string) {

		var data = {
			client_id: CONFIG.HTTP_CLIENT_ID,
			client_secret: CONFIG.HTTP_CLIENT_SECRET,
			grant_type: 'password',
			username: email,
			password: password
		};

		return this._http.post(CONFIG.HTTP_AUTH_URL, data, this._gs.data.httpHeader)
			.flatMap((response: Response) => {

				localStorage.setItem('token', response.json().access_token);
				localStorage.setItem('expiration', response.json().expires_in + Date.now());
				var token = response.json().access_token;
				var base64Url = token.split('.')[1];
				var base64 = base64Url.replace('-', '+').replace('_', '/');

				this._gs.data.httpHeader = { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer ' + token }) };
				this._gs.data.isAuth = true;
				
				return this.getAuthUser().flatMap(
					response => {
						this._gs.data.authUser = response;
						localStorage.setItem('userid', response.id);
						return this._gs.getNumNewMessage();
					}
				);

			});
	}

	getToken() {
		return localStorage.getItem('token');
	}

	logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('expiration');
		localStorage.removeItem('userid');
		this._gs.clearData();
		this._msgService.reset();
	}

}
