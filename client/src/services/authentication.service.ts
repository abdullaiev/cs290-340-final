import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'

import Credentials from "../interfaces/credentials.interface";
import User from "../interfaces/user.interface";
import {environment} from '../environments/environment';

@Injectable()
export class AuthService {
    user: User;
    loggedIn: EventEmitter<boolean> = new EventEmitter();

    constructor(private http: HttpClient) {

    }

    login(credentials: Credentials) {
        return this.http.post(environment.api + 'login', credentials).map((data:any) => {
            if (data.success) {
                this.user = data.user;
                this.loggedIn.emit(true);
            }

            return data;
        });
    }

    signup(user: User) {

    }

    logout() {
        return this.http.get(environment.api + 'logout');
    }

    isLoggedIn() {
        return this.http.get(environment.api + 'is-logged-in').map((data:any) => {
            if (data.success) {
                this.user = data.user;
            }

            return data;
        });
    }
}

