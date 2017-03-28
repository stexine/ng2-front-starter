import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';


import { AppGlobalService } from './app-global.service';
import { AuthService } from './auth.service';

import { Message, MessageService } from './admin/shared/message.service';

declare var Pusher: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	private _socketConn: any;
	private _pusher: any;


	constructor(private _gs: AppGlobalService, private _auth: AuthService, private _msgService: MessageService) {
	}

	ngOnInit() {
		this._gs.pbarStart();

		if (this._gs.isAuth && this._gs.authUser) {
			console.log('get user');
			this._auth.getAuthUser().subscribe(
				(response) => {
					this._gs.authUser = response;
					localStorage.setItem('avatar_img_url', response.avatar_img_url);
				}
			)

			this._gs.getNumNewMessage().subscribe(
				(response) => {
					this._gs.numNewMessage = response;
				},
				(error) => console.log(error)
			);
		}

		// socket listener for message
		this._socketConn = this._msgService.getMessageFromSocket().subscribe(
			message => {
				let msg = JSON.parse(message.toString());
				if (msg.receiver.id == this._gs.authUser.id) {
					if (this._msgService.recvMessages != undefined) {
						this._msgService.recvMessages.unshift(msg);
					}
					this._gs.numNewMessage = this._gs.numNewMessage + 1;
				}
			}
		);

		this._gs.pbarProgress(20);
		this._gs.pbarFinish();
	}

	ngOnDestroy() {
		this._socketConn.unsubscribe();
	}
}
