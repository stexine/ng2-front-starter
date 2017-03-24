import { Component, OnInit } from '@angular/core';

import { AppGlobalService } from '../../../app-global.service';

@Component({
	selector: 'app-folder-widget',
	templateUrl: './folder-widget.component.html',
	styleUrls: ['./folder-widget.component.css']
})
export class FolderWidgetComponent implements OnInit {

	constructor(private _gs: AppGlobalService) {
	}

	ngOnInit() {
	}

}
