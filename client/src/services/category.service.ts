import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'

import {environment} from '../environments/environment';
import {Category} from "../types/category.type";

@Injectable()
export class CategoryService {
    constructor(private http: HttpClient) {

    }

    fetch() {
        return this.http.get(environment.api + 'categories').map(
            (data: Array<Category>) => {
                return data;
            }
        );
    }
}

