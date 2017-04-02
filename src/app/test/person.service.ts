import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Person } from './person';

@Injectable()
export class PersonService {

	constructor(private _http: Http) { }

	getData(): Observable<any> {
		return this._http.get('https://192.168.6.80:82/Apiback/api/v1/test')
			.map(
				(response: Response) => {
					return response.json().user;
				}
			);
	}

}
