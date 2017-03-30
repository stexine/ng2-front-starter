import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppGlobalService } from './app-global.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private _auth: AuthService, private _router: Router, private _gs: AppGlobalService) {

	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


		console.log('guard check');

		if (this.isAuth()) {
			return true;
		} else {
			this._auth.logout();
			this._router.navigate(['/login'], {queryParams: { returnUrl: state.url}});
			return false;
		}

		// this._auth.getAuthUser().subscribe(
		// 	(response) => {
		// 		console.log('set auth true at guard')
		// 		this._auth.isAuth = true;
		// 		return true;
		// 	},
		// 	(error) => {
		// 		console.log(error);
		// 		this._auth.logout();
		// 		this._router.navigate(['/login']);
		// 		return false;
		// 	}
		// );

		// return true;

	}

	private isAuth() {
		if (localStorage.getItem('token') != null && parseInt(localStorage.getItem('expiration')) >= Date.now()) {
			return true;
		} else {
			return false;
		}
	}
}
