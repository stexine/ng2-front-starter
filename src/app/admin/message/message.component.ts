import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
	selector: 'app-message',
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

	constructor(private _router: Router) { 
	}

	ngOnInit() {
		if (this._router.routerState.snapshot.url == '/admin/message') {
			this._router.navigate(['/admin/message/inbox']);
		}
	}

}
