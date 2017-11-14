import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'

import Credentials from "../types/credentials.type";
import User from "../types/user.type";
import {environment} from '../environments/environment';
import {NotificationService} from "./notification.service";

@Injectable()
export class UserService {
    user: User;
    userEmitter: EventEmitter<User> = new EventEmitter();

    constructor(private http: HttpClient,
                private notificationService: NotificationService) {

    }

    login(credentials: Credentials) {
        return this.http.post(environment.api + 'login', credentials).map((data: any) => {
            if (data.success) {
                this.updateCurrentUser(data.user, 'Successfully logged in!');
            }

            return data;
        });
    }

    signup(user: User) {
        return this.http.post(environment.api + 'signup', user).map((data: any) => {
            if (data.success) {
                this.updateCurrentUser(data.user, 'Successfully signed up. Welcome to Books Review!');
            }

            return data;
        });
    }

    logout() {
        return this.http.get(environment.api + 'logout').map((data: any) => {
            if (data.success) {
                this.updateCurrentUser(null, 'Successfully logged out!');
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

                this.updateCurrentUser(data.user, message);
            }

            return data;
        });
    }

    getCurrentUser():User {
        return this.user;
    }

    getUserByID(id: number) {
        return this.http.get(environment.api + 'users/' + id).map((data: Array<User>) => {
            if (data && data.length) {
                return data[0];
            } else {
                return null;
            }
        });
    }

    update(user: User) {
        return this.http.put(environment.api + 'users/', user).map(
            (data: any) => {
                if (data.success) {
                    this.updateCurrentUser(user, 'Profile has been successfully updated!');
                }

                return data;
            }
        );
    }

    delete() {
        return this.http.delete(environment.api + 'users/').map(
            (data: any) => {
                if (data.success) {
                    this.updateCurrentUser(null, 'Profile has been successfully deleted... We\'re sorry to see you go!');
                }

                return data;
            }
        );
    }

    private updateCurrentUser(user: User, message?: string) {
        this.user = user;
        this.userEmitter.emit(user);

        if (message) {
            this.notificationService.success(message);
        }
    }
}

