import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { AppGlobalService } from '../app-global.service';
import { AuthService } from '../auth.service';

declare var Pusher: any;

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: []
})
export class AdminComponent implements OnInit {

	private _pusher: any;

	constructor(private _gs: AppGlobalService, private _auth: AuthService) { }

	ngOnInit() {
		if (this._gs.authUser.name == '' ) {
			this._auth.getAuthUser().subscribe(
				response => {
					this._gs.authUser = response;
					
				}
			)
		}

		//this.initPusher();

	}

	initPusher() {
		Pusher.logToConsole = true;

		this._pusher = new Pusher('eafbf7ed7251b48f9f23', {
			authEndpoint: 'https://apiback/api/v1/user/get-pusher-key',
			auth: {
				headers: {
					'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer ' +  localStorage.getItem('token')
				},
				socket_id: this._gs.pusherSocketId,
			},
			cluster: 'ap1',
			encrpyted: true
		});

		var tmpSocketId = this._gs.pusherSocketId;
		this._pusher.connection.bind('connected', function(data) {
			tmpSocketId = data.socket_id;
		});

		var channel = this._pusher.subscribe('private-chat-0');
		channel.bind('Apiback\Events\MessagePosted', function (data) {
		 	console.log(data);
		});

	}

}