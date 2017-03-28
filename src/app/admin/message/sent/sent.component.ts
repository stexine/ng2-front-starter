import { Component, OnInit } from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';

import { AppGlobalService } from '../../../app-global.service';
import { Message, MessageService } from '../../shared/message.service';

@Component({
	selector: 'app-sent',
	templateUrl: './sent.component.html',
	styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {
	swal: any;

	checkedMessages: number[];
	selectedAll: boolean;

	constructor(private _msgService: MessageService, private _gs: AppGlobalService) { 
		this.checkedMessages = [];
		this.selectedAll = false;
	}

	ngOnInit() {

		swal.isVisible();

		this._gs.pbarProgress(50);

		this._msgService.getSentMessages().subscribe(
			(response) => {
				this._gs.pbarProgress(90);
				this._msgService.sentMessages = response
				this._gs.pbarFinish();

			},
			(error) => console.log(error)
		);
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
			for (m in this._msgService.sentMessages) {
				this.checkedMessages.push(this._msgService.sentMessages[m].id);
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
					mService.deleteMessages(ids, 'sent').subscribe(
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
