import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AppGlobalService } from '../../app-global.service';
import { AuthService } from '../../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	username: string;
	password: string;
	previousUrl: string;
	returnUrl: string;

	constructor(private _gs:AppGlobalService, private _authService: AuthService, private _router: Router, private _route: ActivatedRoute) {
	}

	ngOnInit() {
		this.username = 'ova.wiegand@example.com';
		this.password = 'secret';
		this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
	}

	login(form: NgForm) {
		this._gs.pbarProgress(80);
		this._authService.login(form.value.username, form.value.password)
			.subscribe(
				response => {
					this._gs.data.numNewMessage = response;
					this._gs.sendMessage('user_logged_in');
					this._gs.pbarFinish();
					this._router.navigate([this.returnUrl]);
				},
				error => console.log(error)
			);

	}

}
