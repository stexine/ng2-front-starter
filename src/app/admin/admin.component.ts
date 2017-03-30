import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { AppGlobalService } from '../app-global.service';
import { AuthService } from '../auth.service';

declare var Pusher: any;

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: []
})
export class AdminComponent implements OnInit {

	private _pusher: any;

	constructor(private _gs: AppGlobalService, private _auth: AuthService) { }

	ngOnInit() {

		//set body class for admin
		window.document.body.className = 'hold-transition skin-blue sidebar-mini fixed';

	}

}