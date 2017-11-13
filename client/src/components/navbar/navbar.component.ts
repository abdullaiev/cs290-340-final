import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from "../../services/authentication.service";
import User from "../../types/user.type";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    user: User;

    constructor(private router: Router,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.checkIfLoggedIn();
        this.subscribe();
    }

    checkIfLoggedIn() {
        this.authService.isLoggedIn().subscribe((response: any) => {
            if (response.isLoggedIn) {
                this.user = response.user;
            }
        });
    }

    subscribe() {
        this.authService.userEmitter.subscribe((user: User) => {
            this.user = user;
        });
    }

    logout() {
        this.authService.logout().subscribe((data: any) => {
            if (data.success) {
                this.user = null;
                this.router.navigate(['/login']);
            }
        });
    }
}
