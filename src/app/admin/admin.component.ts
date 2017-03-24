import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { AppGlobalService } from '../app-global.service';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: []
})
export class AdminComponent implements OnInit {

	constructor(private _gs: AppGlobalService, private _auth: AuthService) { }

	ngOnInit() {
		if (this._gs.authUser.name == '' ) {
			this._auth.getAuthUser().subscribe(
				response => {
					console.log('get user');
					this._gs.authUser = response;
				}
			)
		}

	}

}