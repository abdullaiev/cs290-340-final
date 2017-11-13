import {Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

import User from "../../types/user.type";
import {AuthService} from "../../services/authentication.service";
import {UsersService} from "../../services/users.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit, OnDestroy {
    currentUser: User;
    profileUser: User;
    paramsSubscription: Subscription;
    userSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private authService: AuthService,
                private usersService: UsersService) {
    }

    ngOnInit() {
        this.paramsSubscription = this.route.params.subscribe((params: Params) => {
            this.getProfileData(Number(params['id']));
        });
        this.userSubscription = this.authService.userEmitter.subscribe((user: User) => {
            this.currentUser = user;
        });
    }

    getProfileData(id: number) {
        this.currentUser = this.authService.getCurrentUser();

        if (this.currentUser && this.currentUser.id == id) {
            this.profileUser = this.currentUser;
        } else {
            this.fetchProfile(id);
        }
    }

    fetchProfile(id: number) {
        this.usersService.get(id).subscribe((user: User) => {
            this.profileUser = user;
        });
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    }
}
