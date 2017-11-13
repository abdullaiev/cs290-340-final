import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'

import {environment} from '../environments/environment';
import User from "../types/user.type";

@Injectable()
export class UsersService {
    constructor(private http: HttpClient) {

    }

    get(id: number) {
        return this.http.get(environment.api + 'users/' + id).map((data: Array<User>) => {
            if (data && data.length) {
                return data[0];
            } else {
                return null;
            }
        });
    }
}

