import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AppGlobalService } from '../../../app-global.service';
import { Message, MessageService } from '../../shared/message.service';

@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit {

	msg: Message;

	constructor(private _msg: MessageService, private _gs: AppGlobalService, private _route: ActivatedRoute, private _router: Router) { 
		this.msg = new Message;
	}

	ngOnInit() {

		this._gs.pbarProgress(50);
		
		this._route.params.switchMap((params: Params) => 
			this._msg.getMessageById(+params['id']))
				.subscribe( 
					(message) => {
						this._gs.pbarProgress(90);
						this.msg = message;
						this._gs.pbarFinish();
					},
					(error) => {
						console.log(error);
					}
				);
				
	}

}
