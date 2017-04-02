import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import * as io from 'socket.io-client';

import { CONFIG } from '../../config';

import { AppGlobalService } from '../../app-global.service';
import { User } from '../../shared/user.service';
import { PaginationData } from '../../shared/PaginationData';

@Injectable()
export class MessageService {

	serviceData: MessageServiceData;

	private _socket: any;

	constructor(private _http: Http, private _gs: AppGlobalService) {

		this.serviceData = new MessageServiceData;

		this._socket = io(CONFIG.SOCKET_IO_SERVER);
	}

	reset() {
		this.serviceData = new MessageServiceData;
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

		let page = this.serviceData.recvCurrPage.currPage;

		return this._http.post(CONFIG.API_BASE + '/message/get-message-byid', { 'id': id }, this._gs.data.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			}).do(result => {
				
				// set read only if the message is in inbox
				if (result.sender_id != this._gs.data.authUser.id && this.serviceData.recvMessages[page].data != undefined) {
					let index = this.serviceData.recvMessages[page].data.findIndex(function (msg) {
						return msg.id == id
					});
					if (index >= 0) {
						if (this.serviceData.recvMessages[page].data[index].read == false) {
							this._gs.data.numNewMessage = this._gs.data.numNewMessage - 1;
							this.serviceData.recvMessages[page].data[index].read = true;
						}
					}
				}

			});

	}

	getNumNewMessage() {

		if (this.serviceData.numNewMessage >= 0) {
			return Observable.of(this.serviceData.numNewMessage);
		}

		return this._http.get(CONFIG.API_BASE + '/message/get-num-new-message', this._gs.data.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			})
			.do(result => {
				this.serviceData.numNewMessage = result;
			});
	}

	getMessages(itemsPerPage, page, search) {
		let url = '/message/get/'+page+'/'+itemsPerPage+'/'+search;
		return this._http.get(CONFIG.API_BASE + url, this._gs.data.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			})
			.do(result => {
				this.serviceData.recvMessagesTouched = false;
				//this.recvMessages = result;
			});
	}

	getRecvMessages(page, pageSize) {

		this.serviceData.recvCurrPage.currPage = page;

		if (this.serviceData.recvMessages[page] != undefined && !this.serviceData.recvMessagesTouched) {
		 	return Observable.of(this.serviceData.recvMessages[page]);
		}
		
		let url = '/message?page='+page+'&pagesize='+pageSize;

		return this._http.get(CONFIG.API_BASE + url, this._gs.data.httpHeader)
			.map((response: Response) => {
				this.serviceData.recvMessages[page] = new PaginationData;
				return response.json().data;
			})
			.do(result => {
				this.serviceData.recvMessagesTouched = false;
				//this.recvMessages = result;
			});
	}

	getSentMessages(page, pageSize) {
		this.serviceData.sentCurrPage.currPage = page;
		
		if (this.serviceData.sentMessages[page] != undefined && !this.serviceData.sentMessagesTouched) {
		 	return Observable.of(this.serviceData.sentMessages[page]);
		}

		return this._http.post(CONFIG.API_BASE + '/message/get-messages-sent', {'pagesize': pageSize, 'page': page}, this._gs.data.httpHeader)
			.map((response: Response) => {
				this.serviceData.sentMessages[page] = new PaginationData;
				return response.json().data;
			})
			.do(result => {
				this.serviceData.sentMessagesTouched = false;
				//this.recvMessages = result;
			});
	}

	sendMessage(message) {
		return this._http.post(CONFIG.API_BASE + '/message/send-message', message, this._gs.data.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			})
			.do(result => {
				if (this.serviceData.sentMessages[1].data != undefined) {
					this.serviceData.sentMessages[1].data.unshift(result);
				}
			});
	}

	deleteMessages(messageIds: number[], folder: string) {

		return this._http.post(CONFIG.API_BASE + '/message/del-messages', { 'ids': messageIds }, this._gs.data.httpHeader)
			.map((response: Response) => {
				return response.json();
			})
			.do(result => {
				//this.pageData = result;
				this.removeMessages(messageIds, folder);
			});
	}

	removeMessages(messageIds: number[], folder: string) {
		let index: number;
		let target: any[];
		let numNewMsg = 0;

		if (folder == 'sent') {
			target = this.serviceData.sentMessages[this.serviceData.sentCurrPage.currPage].data;
		} else {
			target = this.serviceData.recvMessages[this.serviceData.recvCurrPage.currPage].data;
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
			this._gs.data.numNewMessage = this._gs.data.numNewMessage - numNewMsg;
			this.serviceData.recvMessagesTouched = true;
			this.serviceData.recvMessages = [];
		} else {
			this.serviceData.sentMessagesTouched = true;
			this.serviceData.sentMessages = [];
		}

	}

}

export class Message {
	id: number;
	sender: User;
	receiver: User;
	subject: string;
	message: string;
	read: boolean;
	created_at: string;

	constructor() {
		this.id = 0;
		this.sender = new User;
		this.receiver = new User;
		this.subject = '';
		this.message = '';
		this.read = false;
		this.created_at = '';
	}
}

export class MessageServiceData {
	recvMessages: PaginationData[];
	recvCurrPage: PageListInfo;
	recvMessagesTouched: boolean;
	sentMessages: PaginationData[];
	sentCurrPage: PageListInfo;
	sentMessagesTouched: boolean;
	numNewMessage: number;

	constructor() {
		this.recvMessages = [];
		this.recvCurrPage = new PageListInfo;
		this.recvMessagesTouched = true;
		this.sentMessages = [];
		this.sentCurrPage = new PageListInfo;
		this.sentMessagesTouched = true;
		this.numNewMessage = 0;
	}
}

export class PageListInfo {
	currPage: number;
	total: number;
	from: number;
	to: number;

	constructor() {
		this.currPage = 1;
		this.total = 0;
		this.from = 0;
		this.to = 0;
	}
}

// export class PaginationData {
// 	current_page: number;
// 	data: Message[];
// 	from: number;
// 	to: number;
// 	last_page: number;
// 	per_page: number;
// 	total: number;

// 	constructor() {
// 		this.current_page = 1;
// 		this.from = 1;
// 		this.to = 1;
// 		this.last_page = 1;
// 		this.per_page = 20;
// 		this.total = 0
// 	}
// }
