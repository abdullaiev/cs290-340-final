import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from "../../services/user.service";
import {User} from "../../types/user.type";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    user: User;

    constructor(private router: Router,
                private userService: UserService) {
    }

    ngOnInit() {
        this.checkIfLoggedIn();
        this.subscribe();
    }

    checkIfLoggedIn() {
        this.userService.isLoggedIn().subscribe((response: any) => {
            if (response.isLoggedIn) {
                this.user = response.user;
            }
        });
    }

    subscribe() {
        this.userService.userEmitter.subscribe((user: User) => {
            this.user = user;
        });
    }

    logout() {
        this.userService.logout().subscribe((data: any) => {
            if (data.success) {
                this.user = null;
                this.router.navigate(['/login']);
            }
        });
    }
}
