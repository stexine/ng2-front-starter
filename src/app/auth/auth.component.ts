import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';


import { AppGlobalService } from '../app-global.service';
import { AuthService } from '../auth.service';

import { Message, MessageService } from '../admin/shared/message.service';

@Component({
	selector: 'app-auth',
	template: ``
})
export class AuthComponent implements OnInit {

	constructor(private _gs: AppGlobalService, private _auth: AuthService, private _msgService: MessageService) { }

	ngOnInit() {

		if (this._gs.data.isAuth && this._gs.data.authUser) {
			this._auth.getAuthUser().subscribe(
				(response) => {
					this._gs.data.authUser = response;
					this._gs.sendMessage('user_logged_in');
				}
			)

			this._gs.getNumNewMessage().subscribe(
				(response) => {
					this._gs.data.numNewMessage = response;
				},
				(error) => console.log(error)
			);
		}
	}

}
