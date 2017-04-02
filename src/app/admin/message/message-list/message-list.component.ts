import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationInstance } from 'ng2-pagination';
import swal, { SweetAlertOptions } from 'sweetalert2';

import { AppGlobalService } from '../../../app-global.service';
import { MessageService } from '../../shared/message.service';

@Component({
	selector: 'app-message-list',
	templateUrl: './message-list.component.html',
	styleUrls: ['./message-list.component.css'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class MessageListComponent implements OnInit {

	@Input('data') pageData: any;
	@Input('folder') folder: string;
	@Output() changePage:EventEmitter<number> = new EventEmitter();
	@Output() deletedItems:EventEmitter<number> = new EventEmitter();

	checkedMessages: number[];
	selectedAll: boolean;

	constructor(private _gs: AppGlobalService, private _msgService: MessageService) {
		this.checkedMessages = [];
		this.selectedAll = false;
	}

	ngOnInit() {
	}

	doChangePage(page: number) {
		this.changePage.emit(page);
	}

	isChecked(id: number) {
		if (this.checkedMessages.indexOf(id) >= 0) {
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
			for (m in this.pageData.data) {
				this.checkedMessages.push(this.pageData.data[m].id);
			}
		}
	}

	deleteSelected() {
		this.deleteMessages(this.checkedMessages);
	}

	deleteMessages(msgIds: number[]) {

		this._gs.pbarProgress(50);

		let mService = this._msgService;
		let folder = this.folder;
		let ids = msgIds;

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
					mService.deleteMessages(ids, folder).subscribe(
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
			this.deletedItems.emit(this.pageData.current_page);
			swal(
				'Deleted!',
				'Your file has been deleted.',
				'success'
			);
			this._gs.pbarFinish();
		}.bind(this))

	}

}
