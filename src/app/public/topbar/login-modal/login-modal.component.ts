import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DialogRef, ModalComponent, CloseGuard, ModalContext } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { AppGlobalService } from '../../../app-global.service';
import { AuthService } from '../../../auth.service';

@Component({
	selector: 'app-login-modal',
	templateUrl: './login-modal.component.html',
	styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements CloseGuard, ModalComponent<ModalContext> {

	context: ModalContext;

	username: string;
	password: string;
	loginResult: string; 

	constructor(public dialog: DialogRef<ModalContext>, private _gs: AppGlobalService, private _auth: AuthService) {
		this.username = 'ova.wiegand@example.com';
		this.password = 'secret';
		this.loginResult = '';
		this.context = dialog.context; // this is the dialog reference
		dialog.setCloseGuard(this);
	}

	close() {
		this.dialog.close();
	}

	login(form: NgForm) {
		this.loginResult = '';
		this._gs.pbarProgress(80);
		this._auth.login(form.value.username, form.value.password)
			.subscribe(
				response => {
					this._gs.data.numNewMessage = response;
					this._gs.sendMessage('user_logged_in');
					this.loginResult = '';
					this._gs.pbarFinish();
					this.dialog.close();
				},
				error => {
					this._gs.pbarFail();
					console.log(error);
					this.loginResult = 'Username and password error';
				}
			);

	}

}
