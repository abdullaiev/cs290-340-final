import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from "../../services/authentication.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    loggedIn = false;

    constructor(private router:Router,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.checkIfLoggedIn();
        this.subscribe();
    }

    checkIfLoggedIn() {
        this.authService.isLoggedIn().subscribe((response) => {
            this.loggedIn = response.isLoggedIn;
        });
    }

    subscribe() {
        this.authService.loggedIn.subscribe((loggedIn: boolean) => {
           this.loggedIn = loggedIn;
        });
    }

    logout() {
        this.authService.logout().subscribe((data:any) => {
            if (data.success) {
                this.loggedIn = false;
                this.router.navigate(['/login']);
            }
        });
    }
}
