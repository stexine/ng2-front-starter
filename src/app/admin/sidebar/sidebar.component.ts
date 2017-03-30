import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { AdminService } from '../shared/admin.service';
import { AuthService } from '../../auth.service';
import { AppGlobalService } from '../../app-global.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	constructor(private _adminService: AdminService, private _auth: AuthService, private _gs: AppGlobalService) {
	}

	ngOnInit() {
	}

}
