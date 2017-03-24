import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { CONFIG } from '../../config';

import { AppGlobalService } from '../../app-global.service';

import { User } from '../../shared/user.service';

@Injectable()
export class ProfileService {

	profile: Profile;

	constructor(private _http: Http, private _gs: AppGlobalService) {
	}

	getUserProfile() {
		if (this.profile) {
			return Observable.of(this.profile);
		}

		return this._http.get(CONFIG.API_BASE + '/user/profile', this._gs.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			})
			.do(result => {
				this.profile = result;
			});
	}

	updateUserProfile(user: User) {
		let postData = { 'user': user };
		return this._http.put(CONFIG.API_BASE + '/user/update', postData, this._gs.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			})
			.do(result => {
				this.profile = result;
				
			});
	}

	uploadAvatarImage(image:any) {
		let postData = {img: image};

		return this._http.post(CONFIG.API_BASE + '/user/image-upload', postData, this._gs.httpHeader)
			.map((response: Response) => {
				return response.json().data;
			})
			.do(result => {
				//console.log(result);
			});


	}

}

export interface Profile {
    address: string,
    tel: string
}
