import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import * as io from 'socket.io-client';

import { CONFIG } from '../../config';

import { AppGlobalService } from '../../app-global.service';
import { User } from '../../shared/user.service';

@Injectable()
export class MessageService {

	recvMessages: any[];
	recvMessagesTouched: boolean;
	sentMessages: any[];
	sentMessagesTouched: boolean;
	numNewMessage: number;

	private _socket: any;

	constructor(private _http: Http, private _gs: AppGlobalService) {
		
		this.numNewMessage = -1;
		this.recvMessagesTouched = true;
		this.sentMessagesTouched = true;

		this._socket = io(CONFIG.SOCKET_IO_SERVER);
	}

	reset() {
		this.recvMessages = undefined;
		this.sentMessages = undefined;
		this.recvMessagesTouched = true;
		this.sentMessagesTouched = true;
		this.numNewMessage = -1;

	}

	sendMessageToSocket() {

	}

	getMessageFromSocket() {
		let observable = new Observable(observer => {
			this._socket.on('message', (data) => {
				observer.next(data);
			});
			return () => {
				this._socket.disconnect();
			};
		})
		return observable;
	}

	getMessageById(id) {

		return this._http.post(CONFIG.API_BASE + '/message/get-message-byid', { 'id': id }, this._gs.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			}).do(result => {
				var index = this.recvMessages.findIndex(function (msg) {
					return msg.id == id
				});
				if (index >= 0) {
					if (this.recvMessages[index].read == false) {
						this._gs.numNewMessage = this._gs.numNewMessage - 1;
						this.recvMessages[index].read = true;
					}
				}
			});

	}

	getNumNewMessage() {

		if (this.numNewMessage >= 0) {
			return Observable.of(this.numNewMessage);
		}

		return this._http.get(CONFIG.API_BASE + '/message/get-num-new-message', this._gs.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			})
			.do(result => {
				this.numNewMessage = result;
			});
	}

	getRecvMessages() {
		if (!this.recvMessagesTouched) {
		 	return Observable.of(this.recvMessages);
		}

		return this._http.post(CONFIG.API_BASE + '/message/get-messages', {}, this._gs.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			})
			.do(result => {
				this.recvMessagesTouched = false;
				//this.recvMessages = result;
			});
	}

	getSentMessages() {
		if (this.sentMessages) {
			return Observable.of(this.sentMessages);
		}

		return this._http.post(CONFIG.API_BASE + '/message/get-messages-sent', {}, this._gs.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			})
			.do(result => {
				//this.recvMessages = result;
			});
	}

	sendMessage(message) {
		return this._http.post(CONFIG.API_BASE + '/message/send-message', message, this._gs.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			})
			.do(result => {
				this.sentMessages.unshift(result);
			});
	}

	deleteMessages(messageIds: number[], folder: string) {

		return this._http.post(CONFIG.API_BASE + '/message/del-messages', { 'ids': messageIds }, this._gs.httpHeader)
			.map((response: Response) => {
				return response.json();
			})
			.do(result => {
				this.removeMessages(messageIds, folder);
			});
	}

	removeMessages(messageIds: number[], folder: string) {
		var index: number;
		var target: any[];
		var numNewMsg = 0;

		if (folder == 'sent') {
			target = this.sentMessages;
		} else {
			target = this.recvMessages;
		}

		messageIds.forEach(function (msgId) {
			index = target.findIndex(function (msg) {
				return msg.id == msgId;
			});

			if (target[index].read == 0) {
				numNewMsg = numNewMsg + 1;
			}
			target.splice(index, 1);
		});

		if (folder == 'inbox') {
			this._gs.numNewMessage = this._gs.numNewMessage - numNewMsg;
		}
	}

}

export interface Message {
	id: number,
	sender: User,
	receiver: User,
	subject: string,
	message: string,
	read: boolean,
	created_at: string
}
