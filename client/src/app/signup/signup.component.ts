import {Component} from '@angular/core';
import {Router} from '@angular/router';

import User from "../../types/user.type";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})


export class SignupComponent {
    constructor(private userService: UserService,
                private router: Router) {
    }

    signup(user: User) {
        this.userService.signup(user).subscribe(
            data => {
                if (data.success) {
                    this.router.navigate(['/books']);
                }
            }
        );
    }
}
