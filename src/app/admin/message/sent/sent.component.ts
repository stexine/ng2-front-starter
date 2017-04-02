import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppGlobalService } from '../../../app-global.service';
import { Message, MessageService } from '../../shared/message.service';


@Component({
	selector: 'app-sent',
	templateUrl: './sent.component.html',
	styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit, OnDestroy {

	private _sub: any;
	
	pageSize: number;
	pageData: any;
	folder: string;

	constructor(private _msg: MessageService, private _gs: AppGlobalService) { 

		this.pageSize = 10;
		this.folder = 'sent';

		this.pageData = {};
		this.pageData.current_page = _msg.serviceData.sentCurrPage.currPage;		
		
	}

	ngOnInit() {

		this._gs.pbarProgress(30);

		this.getPage(this.pageData.current_page);
	}

	ngOnDestroy() {
		this._sub.unsubscribe();
	}

	getPage(page) {

		this._gs.pbarProgress(60);

		this._sub = this._msg.getSentMessages(page, this.pageSize).subscribe(
			(response) => {
				this._gs.pbarProgress(90);
				this._msg.serviceData.sentMessages[page] = response;

				this.pageData = this._msg.serviceData.sentMessages[page];
				
				this._gs.pbarFinish();

			},
			(error) => console.log(error)
		);

	}

}
