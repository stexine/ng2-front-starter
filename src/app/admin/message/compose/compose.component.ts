import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppGlobalService } from '../../../app-global.service';
import { User, UserService } from '../../../shared/user.service';
import { MessageService } from '../../shared/message.service';

@Component({
	selector: 'app-compose',
	templateUrl: './compose.component.html',
	styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

	receiver: any;
	subject: string;
	message: string;

	optionSelected: any;
	friends: User[];
	selectOptions: any[];

	constructor(private _router: Router, private _gs: AppGlobalService, private _userService: UserService, private _msgService: MessageService) {
	}

	ngOnInit() {

		this._userService.getFriends().subscribe(
			response => {
				this.friends = response;
				this._gs.pbarProgress(90);
				
				this.makeSelectOptions();
				this._gs.pbarFinish();
			},
			error => {
				console.log(error);
			}
		);
	}


	makeSelectOptions() {
		var result = [];
		this.friends.forEach((friend : {id:number, name:string}) => {
			result.push({
				id: friend.id,
				text: friend.name
			})
		})
		this.selectOptions = result;
	}

	onOptionSelected(event) {
		this.optionSelected = event;
	}


	keyupHandler(event) {
		this.message = event;
	}

	sendMessage() {
		let message = {
			'receiver_id': this.optionSelected.id,
			'subject': this.subject,
			'message': this.message
		};
		this._gs.pbarProgress(80);

		this._msgService.sendMessage(message).subscribe(
			response => {
				this._gs.pbarFinish();
				this._router.navigate(['/admin/message/sent']);
			},
			error => console.log(error)
		);
		
	}
}
