import { Notification } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { CONFIG } from '../config';
import { AppGlobalService } from '../app-global.service';
import { AuthService } from '../auth.service';


@Injectable()
export class NotificationService {

	notifications: AppNotice[];

	constructor() {
		this.notifications = [];
	}


}

export class AppNotice {
	name: string;
	type: string;
	content: any;

	constructor() {
		this.name = '';
		this.type = '';
		this.content = {};
	}
}
