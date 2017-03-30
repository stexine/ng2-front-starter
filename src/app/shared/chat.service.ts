import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { CONFIG } from '../config';

import { AppGlobalService } from '../app-global.service';
import { User, UserService } from './user.service';

@Injectable()
export class ChatService {

	chatUser: User;
	chatroomId: number;
	chatrooms: any[];

	constructor(private _http: Http, private _gs: AppGlobalService, private _userService: UserService) { 
		this.chatrooms = [];
	}

	getChats() {
		return this._http.get(CONFIG.API_BASE + '/chat/chatrooms', this._gs.data.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			})
			.do(result => {
				this.chatrooms = result;
			});
	}

	getChatsByChatroomId(chatroomId) {
		return this._http.get(CONFIG.API_BASE + '/chat/chatroom/' + chatroomId, this._gs.data.httpHeader)
			.map((response: Response) => { 
				return response.json();
			})
			.do(result => {
			});
	}

	getPrivateChats(userId) {

		return this._http.get(CONFIG.API_BASE + '/chat/private/' + userId, this._gs.data.httpHeader)
			.map((response: Response) => { 
				return response.json();
			})
			.do(result => {
				//this.chatroomId = result.chatroom_id;
				//this.chats = result.chats;
			});
	}

	sendChat(chatroomId, chatMessage) {
		let data = {'chatroom_id': chatroomId, 'chat_message': chatMessage};
		return this._http.post(CONFIG.API_BASE + '/chat/post-chat', data, this._gs.data.httpHeader)
			.map((response: Response) => { 
				return response.json().data;
			})
			.do(result => {
			});
	}

}
