import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TestService {

  constructor(private _http: Http) { }

  getData(): Observable<Book[]> {
    return this._http.get('api/books.json').map( (response: Response) => <Book[]>response.json());
  }

}

interface Book {
  name: string,
  description: string
}
