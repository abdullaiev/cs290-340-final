import {Component} from '@angular/core';
import {Router} from '@angular/router';

import User from "../../types/user.type";
import {AuthService} from "../../services/authentication.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})


export class SignupComponent {
    user: User = new User();

    constructor(private authService: AuthService,
                private router: Router) {
    }

    signup() {
        this.authService.signup(this.user).subscribe(
            data => {
                if (data.success) {
                    this.router.navigate(['/books']);
                }
            }
        );
    }
}
