import { Component, OnInit } from '@angular/core';

import { AppGlobalService } from '../../app-global.service';
import { User, UserService } from '../../shared/user.service';

import { ChatService } from '../../shared/chat.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
	userId: string;
	show: string;
	friends: User[];
	chatlist: any[];
	chats: any[];
	chatroomId: number;
	chatroomName: string;
	chatMessage: string;

	constructor(private _gs: AppGlobalService, private _userService: UserService, private _chatService: ChatService) {
		this.userId = localStorage.getItem('userid');
		this.show = 'chats';
		this.chatMessage = '';
	}

	ngOnInit() {

		// get all chats
		this._chatService.getChats().subscribe(
			response => {
				this._gs.pbarProgress(90);
				this.chatlist = response;
				this._gs.pbarFinish();
			},
			error => {
				console.log(error);
			}
		);

		// get friend list
		this._userService.getFriends().subscribe(
			response => {
				this._gs.pbarProgress(90);
				this.friends = response;
				this._gs.pbarFinish();
			},
			error => {
				console.log(error);
			}
		);
	}

	toggleShowTab(tab) {
		this.show = tab;
	}

	getChatroomName(chatroomId) {
		var index = this.chatlist.findIndex(function(chatroom) {
			return chatroom.id == chatroomId;
		});

		this.chatroomName = this.chatlist[index].name;
	}

	getChatsById(chatroomId) {
		this._chatService.getChatsByChatroomId(chatroomId).subscribe(
			response => {
				this._gs.pbarProgress(90);
				this.chatroomId = chatroomId;
				this.getChatroomName(chatroomId);
				this.chats = response.chats;
				this._gs.pbarFinish();
			},
			error => {
				console.log(error);
			}
		);
	}

	getChatroomNameByUserId(userId) {
		var index = this.friends.findIndex(function(friend) {
			return friend.id == userId; 
		});

		return this.friends[index].name;
	}

	getPrivateChats(userId) {
		this._chatService.getPrivateChats(userId).subscribe(
			response => {
				this._gs.pbarProgress(90);
				this.chatroomId = response.chatroom.id;
				this.chatroomName = response.chatroom_name;
				this.chats = response.chats;

				
				// push new chatroom to list
				var index = this.chatlist.findIndex((chatroom) => {
					return chatroom.id == response.chatroom_id; 
				});
				if (index < 0) {
					this.chatlist.unshift(response.chatroom);
				}

				this._gs.pbarFinish();
			},
			error => {
				console.log(error);
			}
		);
	}

	sendChat() {

		this._chatService.sendChat(this.chatroomId, this.chatMessage).subscribe(
			response => {
				this._gs.pbarProgress(90);
				this.chats.push(response);
				this.chatMessage = '';
				this._gs.pbarFinish();
			},
			error => {
				console.log(error);
			}
		);
	}

}
