import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

	constructor(private _gs:AppGlobalService, private _authService: AuthService, private _router: Router) { }

	ngOnInit() {
		this.username = 'ova.wiegand@example.com';
		this.password = 'secret';
	}

	login(form: NgForm) {
		this._gs.pbarProgress(50);
		this._authService.login(form.value.username, form.value.password)
			.subscribe(
				response => {
					this._gs.pbarFinish();
					this._router.navigate(['/admin']);
				},
				error => console.log(error)
			);

	}

}
