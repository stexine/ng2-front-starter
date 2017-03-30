import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { CONFIG } from './config';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { User } from './shared/User';

@Injectable()
export class AppGlobalService {

	private subject = new Subject<any>();

	data: GlobalData;

	//progressBar: SlimLoadingBarService;

	constructor(private _pbar: SlimLoadingBarService, private _http: Http) {

		this.data = new GlobalData;

		if (localStorage.getItem('token') != null) {
			this.data.isAuth = true;
		} else {
			this.data.isAuth = false;
		}

		//this.data.authUser = new User;
		//this.progressBar = new SlimLoadingBarService;

		this.data.httpHeader = { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer ' +  localStorage.getItem('token')}) };

		this.data.numNewMessage = 0;
		this.data.numNewChat = 0;
	}

	sendMessage(message) {
		this.subject.next({ text: message});
	}

	clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }


	clearData() {
		this.data = new GlobalData;
	}

	pbarStart() {
		this._pbar.start();
	}

	pbarFail() {
		this._pbar.color = 'red';
		this._pbar.reset();
		this._pbar.color = '#96ff59';
	}

	pbarProgress(progress: number) {
		this._pbar.progress = progress;
	}

	pbarFinish() {
		this._pbar.complete();
	}

	getNumNewMessage() {

		return this._http.get(CONFIG.API_BASE + '/message/get-num-new-message', this.data.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			})
			.do(result => {
			});
	}	

}

class GlobalData {
	isAuth: boolean;
	authUser: User;
	numNewChat: number;
	numNewMessage: number;
	pusherSocketId: string;
	pusherAuthCode: string;
	httpHeader: any;

	constructor() {
		this.isAuth = false;
		this.authUser = new User;
		this.numNewChat = 0;
		this.numNewMessage = 0;
		this.pusherSocketId = '';
		this.pusherAuthCode = '';
		this.httpHeader = {};
	}
}
