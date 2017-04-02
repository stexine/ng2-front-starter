import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import { AppGlobalService } from '../../app-global.service';
import { NotificationService } from '../../shared/notification.service';
import { AuthService } from '../../auth.service';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

	constructor(private _gs: AppGlobalService, private _auth: AuthService, private _router: Router, private _notice: NotificationService) {
	}

	ngOnInit() {
	}

	logout() {
		this._auth.logout();
		this._router.navigate(['/']);
	}

}
