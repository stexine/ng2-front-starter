import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-public',
	templateUrl: './public.component.html',
	styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

	constructor(private _router: Router) { }

	ngOnInit() {
		window.document.body.className = 'hold-transition skin-blue layout-top-nav';
		this._router.navigate(['/welcome'], { replaceUrl: true });
	}

}
