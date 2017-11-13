import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'

import Credentials from "../types/credentials.type";
import User from "../types/user.type";
import {environment} from '../environments/environment';
import {NotificationService} from "./notification.service";

@Injectable()
export class AuthService {
    user: User;
    userEmitter: EventEmitter<User> = new EventEmitter();

    constructor(private http: HttpClient,
                private notificationService: NotificationService) {

    }

    login(credentials: Credentials) {
        return this.http.post(environment.api + 'login', credentials).map((data: any) => {
            if (data.success) {
                this.update(data.user, 'Successfully Logged In!');
            }

            return data;
        });
    }

    signup(user: User) {
        return this.http.post(environment.api + 'signup', user).map((data: any) => {
            if (data.success) {
                this.update(data.user, 'Successfully Signed Up. Welcome to Books Review!');
            }

            return data;
        });
    }

    logout() {
        return this.http.get(environment.api + 'logout').map((data: any) => {
            if (data.success) {
                this.update(null, 'Successfully Logged Out!');
            }

            return data;
        });
    }

    isLoggedIn() {
        return this.http.get(environment.api + 'is-logged-in').map((data: any) => {
            if (data.success) {
                let message: string;

                if (data.user) {
                    message = 'Welcome back!';
                }

                this.update(data.user, message);
            }

            return data;
        });
    }

    getCurrentUser():User {
        return this.user;
    }

    private update(user: User, message?: string) {
        this.user = user;
        this.userEmitter.emit(user);

        if (message) {
            this.notificationService.success(message);
        }
    }
}

