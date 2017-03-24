import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { CONFIG } from '../config';

import { AppGlobalService } from '../app-global.service';

@Injectable()
export class UserService {

	constructor(private _http: Http, private _gs: AppGlobalService) { }

	getFriends() {
		var result;
		return this._http.get(CONFIG.API_BASE + '/user/friends', this._gs.httpHeader)
			.map((response: Response) => {
				let data = response.text() ? response.json().data : [{}];
				if (data) {
					result = data;
				}
				return result;
			});

	}
}

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    password2: string;
    avatar_img_url: string;
    profile: any

    constructor() {
        this.id = 0;
        this.name = '';
        this.email = '';
        this.password = '';
        this.password2 = '';
        this.avatar_img_url = '';
        this.profile = {}
    }
}

export interface Profile {
    address: string,
    tel: string
}
