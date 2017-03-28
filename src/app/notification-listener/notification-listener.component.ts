import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';


import { CONFIG } from '../config';
import { AppGlobalService } from '../app-global.service';
import { AuthService } from '../auth.service';

declare var Pusher: any;

@Component({
	selector: 'app-notification-listener',
	template: ``
})
export class NotificationListenerComponent implements OnInit {

	private _pusher: any;

	constructor(private _gs: AppGlobalService, private _auth: AuthService) { }

	ngOnInit() {
		if (this._gs.authUser.id > 0) {
			this.initPusher('private-notice-'+this._gs.authUser.id, 'Apiback\Events\MessagePosted');
		}
	}

	initPusher(channel, eventName) {
		Pusher.logToConsole = true;

		this._pusher = new Pusher(CONFIG.PUSHER_KEY, {
			authEndpoint: CONFIG.API_BASE + '/user/get-pusher-key',
			auth: {
				headers: {
					'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer ' + localStorage.getItem('token')
				},
				socket_id: this._gs.pusherSocketId,
			},
			cluster: CONFIG.PUSHER_CLUSTER,
			encrpyted: true
		});

		var tmpSocketId = this._gs.pusherSocketId;
		this._pusher.connection.bind('connected', function (data) {
			tmpSocketId = data.socket_id;
		});

		var channel = this._pusher.subscribe(channel);
		channel.bind(eventName, function (data) {
			console.log(data);
		});

	}
}
