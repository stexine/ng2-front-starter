import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { AppGlobalService } from './app-global.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	private _socketConn: any;

	constructor(private _gs: AppGlobalService) {
	}

	ngOnInit() {
		console.log('App Start');
		this._gs.pbarStart();

		this._gs.pbarProgress(20);
		this._gs.pbarFinish();
	}

}
