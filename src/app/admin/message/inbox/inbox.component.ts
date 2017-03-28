import { Component, OnInit, OnDestroy } from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';

import { AppGlobalService } from '../../../app-global.service';
import { Message, MessageService } from '../../shared/message.service';

@Component({
	selector: 'app-inbox',
	templateUrl: './inbox.component.html',
	styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, OnDestroy {

	private _sub: any;
	checkedMessages: number[];
	selectedAll: boolean;

	constructor(private _msgService: MessageService, private _gs: AppGlobalService) {
		this.checkedMessages = [];
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

	isChecked(id: number) {
		if ( this.checkedMessages.indexOf(id) >= 0 ) {
			return true;
		} else {
			return false;
		}
	
	}

	updateChecked(id: number, event) {
		var index = this.checkedMessages.indexOf(id);

		if (index >= 0) {
			this.checkedMessages.splice(index, 1);
		} else {
			this.checkedMessages.push(id);
		}
	}

	selectAll() {
		this.checkedMessages = [];
		if (this.selectedAll) {
			this.selectedAll = false;
		} else {
			this.selectedAll = true;
			var m;
			for (m in this._msgService.recvMessages) {
				this.checkedMessages.push(this._msgService.recvMessages[m].id);
			}
		}
	}

	deleteSelected() {
		this.deleteMessages(this.checkedMessages);
	}	

	deleteMessages(msgIds: number[]) {
		
		this._gs.pbarProgress(50);

		var mService = this._msgService;
		var ids = msgIds;

		swal({
			title: 'Are you sure to delete?',
			text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			showLoaderOnConfirm: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
			preConfirm: function (store) {
				return new Promise(function (resolve, reject) {
					mService.deleteMessages(ids, 'inbox').subscribe(
						(response) => {
							resolve(response);
						},
						(error) => console.log(error)
					);
				});
			}
		}).then(function () {
			this._gs.pbarProgress(90);
			this.checkedMessages = [];
			this.selectedAll = false;
			swal(
				'Deleted!',
				'Your file has been deleted.',
				'success'
			);
			this._gs.pbarFinish();
		}.bind(this))

	}

}
