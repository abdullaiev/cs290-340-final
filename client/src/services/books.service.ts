import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'

import {environment} from '../environments/environment';

@Injectable()
export class BooksService {
    constructor(private http: HttpClient) {

    }

    fetch() {
        return this.http.get(environment.api + 'books');
    }
}

