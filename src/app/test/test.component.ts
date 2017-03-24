import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';

import { PersonService } from './person.service';
import { Person } from './person';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

	person: Person;

	constructor(private _personService: PersonService) { 
		this.person = {
			first_name: '',
			last_name: '',
			from: ''
		}
	}

	ngOnInit() {
		this.getData();
	}

	getData() {
		this._personService.getData()
			.subscribe(
				(response) => this.processResult( response ),
				(error: Response) => console.log(error)
			);
	}

	processResult(result) {
		// console.log(result['first_name']);
		this.person.first_name = result['first_name'];
		this.person.last_name = result['last_name'];
		this.person.from = result['from'];
		console.log(this.person);
	}

}
