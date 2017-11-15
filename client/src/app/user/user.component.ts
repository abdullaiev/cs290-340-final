import {Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

import {User} from "../../types/user.type";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {BookListComponent} from "../../components/book-list/book-list.component";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit, OnDestroy {
    editing: boolean = false;
    currentUser: User;
    profileUser: User;
    userEditCopy: User;
    paramsSubscription: Subscription;
    userSubscription: Subscription;

    @ViewChild(BookListComponent) private bookList: BookListComponent;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private userService: UserService) {
    }

    ngOnInit() {
        this.subscribeToURLChanges();
        this.subscribeToCurrentUserChanges();
    }

    subscribeToURLChanges() {
        this.paramsSubscription = this.route.params.subscribe((params: Params) => {
            this.getProfileData(Number(params['id']));
        });
    }

    subscribeToCurrentUserChanges() {
        this.userSubscription = this.userService.userEmitter.subscribe((user: User) => {
            this.currentUser = user;
        });
    }

    getProfileData(id: number) {
        this.currentUser = this.userService.getCurrentUser();

        if (this.currentUser && this.currentUser.id == id) {
            this.profileUser = this.currentUser;
        } else {
            this.fetchProfile(id);
        }
    }

    fetchProfile(id: number) {
        this.userService.getUserByID(id).subscribe((user: User) => {
            this.profileUser = user;
        });
    }

    editProfile() {
        this.userEditCopy = Object.assign({}, this.currentUser);
        this.editing = true;
    }

    cancelEditing() {
        this.editing = false;
    }

    updateProfile(user: User) {
        this.userService.update(user).subscribe(
            (data: any) => {
                if (data.success) {
                    this.currentUser = this.profileUser = user;
                    this.editing = false;
                    this.bookList.fetchBooks();
                }
            }
        );
    }

    deleteProfile() {
        const message = 'A deleted profile cannot be restored. Are you sure you want to proceed?';
        let isUserSure = confirm(message);

        if (!isUserSure) {
            return;
        }

        this.userService.delete().subscribe(
            (data: any) => {
                if (data.success) {
                    this.router.navigate(['']);
                }
            }
        );
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    }
}
