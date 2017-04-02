import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppGlobalService } from '../../../app-global.service';
import { Message, MessageService } from '../../shared/message.service';

@Component({
	selector: 'app-inbox',
	templateUrl: './inbox.component.html',
	styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, OnDestroy {

	private _sub: any;

	pageSize: number;
	pageData: any;
	folder: string;

	constructor(private _msg: MessageService, private _gs: AppGlobalService) {
		
		this.pageSize = 3;
		this.folder = 'inbox';
		
		this.pageData = {};
		this.pageData.current_page = _msg.serviceData.recvCurrPage.currPage;		
		
	}

	ngOnInit() {

		this._gs.pbarProgress(30);

		this.getPage(this.pageData.current_page);
		
	}

	ngOnDestroy() {
		this._sub.unsubscribe();
	}

	getPage(page) {

		this._gs.pbarProgress(40);

		this._sub = this._msg.getRecvMessages(page, this.pageSize).subscribe(
			(response) => {
				this._gs.pbarProgress(90);
				this._msg.serviceData.recvMessages[page] = response;

				this.pageData = this._msg.serviceData.recvMessages[page];
				
				this._gs.pbarFinish();

			},
			(error) => console.log(error)
		);
	}

}
