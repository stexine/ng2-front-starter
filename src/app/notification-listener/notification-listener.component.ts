import { Notification } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';


import { CONFIG } from '../config';
import { AppGlobalService } from '../app-global.service';
import { AppNotice, NotificationService } from '../shared/notification.service';
import { Message, MessageService } from '../admin/shared/message.service';
import { ChatService } from '../shared/chat.service';

declare var Pusher: any;

@Component({
	selector: 'app-notification-listener',
	template: ``
})
export class NotificationListenerComponent implements OnInit, OnDestroy {

	private _message: any;
	private _sub: Subscription;
	private _socketConn: any;

	private _pusher: any;

	constructor(private _gs: AppGlobalService, private _msg: MessageService, private _chatSerivce: ChatService, private _noticeService: NotificationService) {
		this._sub = this._gs.getMessage().subscribe(
			message => { 
				console.log(message);
				if (message.text == 'user_logged_in') {
					this.initSocket();
					this.initPusher('private-notice-' + this._gs.data.authUser.id, 'Apiback\\Events\\MessagePosted');
				}
			});
	}

	ngOnInit() {
		
	}

	ngOnDestroy() {
		this._sub.unsubscribe();
		this._socketConn.unsubscribe();
	}

	initSocket() {
		// socket listener for message
		this._socketConn = this._msg.getMessageFromSocket().subscribe(
			message => {
				let msg = JSON.parse(message.toString());
				if (msg.receiver.id == this._gs.data.authUser.id) {
					if (this._msg.serviceData.recvMessages[1].data != undefined && this._msg.serviceData.recvCurrPage.currPage == 1) {
						this._msg.serviceData.recvMessages[1].to = this._msg.serviceData.recvMessages[1].to + 1;
						this._msg.serviceData.recvMessages[1].total = this._msg.serviceData.recvMessages[1].total + 1;
						this._msg.serviceData.recvMessages[1].data.unshift(msg);
					}
					this._gs.data.numNewMessage = this._gs.data.numNewMessage + 1;
				}
			}
		);
	}

	initPusher(channelName, eventName) {
		Pusher.logToConsole = true;

		this._pusher = new Pusher(CONFIG.PUSHER_KEY, {
			authEndpoint: CONFIG.API_BASE + '/user/get-pusher-key',
			auth: {
				headers: {
					'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer ' + localStorage.getItem('token')
				},
				socket_id: this._gs.data.pusherSocketId,
			},
			cluster: CONFIG.PUSHER_CLUSTER,
			encrpyted: true
		});

		var tmpSocketId = this._gs.data.pusherSocketId;
		this._pusher.connection.bind('connected', function (data) {
			tmpSocketId = data.socket_id;
		});

		let that = this;
		var channel = this._pusher.subscribe(channelName);
		channel.bind(eventName, function (data) {
			let channel = data.channel;
			let message = data.message;

			let notice = new AppNotice;
			notice.type = 'chat';
			notice.content = message;
			notice.name = 'You have got new chat message';
			that._noticeService.notifications.unshift(notice);
			that._gs.data.numNewChat = that._gs.data.numNewChat + 1;

			
		});

	}
}
