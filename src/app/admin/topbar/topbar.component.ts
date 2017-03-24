import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import { AppGlobalService } from '../../app-global.service';
import { AuthService } from '../../auth.service';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

	username: any;
	userAvatar: string;

	constructor(private _gs: AppGlobalService, private _auth: AuthService, private _router: Router) { }

	ngOnInit() {
	}

	logout() {
		this._auth.logout();
		this._router.navigate(['/login']);
	}

}
