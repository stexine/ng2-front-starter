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
	checkedMessages: any[];
	selectedAll: boolean;

	constructor(private _msgService: MessageService, private _gs: AppGlobalService) {
		this.selectedAll = false;
	}

	ngOnInit() {

		this._gs.pbarProgress(50);

		this._sub = this._msgService.getRecvMessages().subscribe(
			(response) => {
				this._gs.pbarProgress(90);
				this._msgService.recvMessages = response
				this._gs.pbarFinish();

			},
			(error) => console.log(error)
		);
	}

	ngOnDestroy() {
		this._sub.unsubscribe();
	}

	selectAll() {
		this.checkedMessages = [];
		if (this.selectedAll) {
			this.selectedAll = false;
		} else {
			this.selectedAll = true;
			var m;
			for (m in this._msgService.recvMessages) {
				this.checkedMessages.push(this._msgService.recvMessages[m]);
			}
		}
	}

	deleteMessages(msgIds: number[]) {
		
		this._gs.pbarProgress(50);

		this._msgService.deleteMessages(msgIds, 'inbox').subscribe(
			(response) => {
				this._gs.pbarProgress(90);
				this._gs.pbarFinish();
			},
			(error) => console.log(error)
		);
	}

}
