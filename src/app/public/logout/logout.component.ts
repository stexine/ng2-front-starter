import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

	constructor(private _auth: AuthService, private _router: Router) { }

	ngOnInit() {
		this._auth.logout();
		this._router.navigate(['/login']);
	}

}
