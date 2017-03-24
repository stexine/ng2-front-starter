import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { CONFIG } from '../../config';

import { AuthService } from '../../auth.service';

@Injectable()
export class AdminService {

	authUser: any;


	constructor(private _auth: AuthService) { }


}
