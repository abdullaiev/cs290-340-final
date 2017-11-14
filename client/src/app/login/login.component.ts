import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from "../../services/user.service";
import Credentials from "../../types/credentials.type";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    credentials: Credentials = {
        email: '',
        password: ''
    };

    constructor(private router: Router,
                private userService: UserService) {
    }

    login() {
        this.userService.login(this.credentials).subscribe((data: any) => {
            if (data.success) {
                this.router.navigate(['/books']);
            }
        });
    }
}
