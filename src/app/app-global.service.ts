import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { CONFIG } from './config';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { User } from './shared/User';

@Injectable()
export class AppGlobalService {

	isAuth: boolean;
	authUser: User;
	numNewChat: number;
	numNewMessage: number;
	pusherSocketId: string;
	pusherAuthCode: string;

	httpHeader: any;

	progressBar: SlimLoadingBarService;

	constructor(private _pbar: SlimLoadingBarService, private _http: Http) {

		if (localStorage.getItem('token') != null) {
			this.isAuth = true;
		} else {
			this.isAuth = false;
		}

		this.authUser = new User;

		this.httpHeader = { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer ' +  localStorage.getItem('token')}) };

		this.numNewMessage = 0;
		this.numNewChat = 0;
	}

	clearAuth() {
		this.isAuth = false;
		this.authUser = new User;
		this.httpHeader = undefined;
	}

	pbarStart() {
		this._pbar.start();
	}

	pbarProgress(progress: number) {
		this._pbar.progress = progress;
	}

	pbarFinish() {
		this._pbar.complete();
	}

	getNumNewMessage() {

		return this._http.get(CONFIG.API_BASE + '/message/get-num-new-message', this.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			})
			.do(result => {
			});
	}

	getCsrfToken() {
		return this._http.post(CONFIG.API_BASE + '/user/bc-token', {'socket_id': this.pusherSocketId}, this.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			})
			.do(result => {
				this.pusherAuthCode = result;
				console.log(result);
			});
	}

	

}
