import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";

import {Category} from "../../types/category.type";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.css']
})

export class AddBookComponent {
    categories: Observable<Category[]>;

    constructor(private router: Router,
                private userService: UserService) {
    }

    redirect() {
        const id = this.userService.getCurrentUser().id;
        this.router.navigate(['users', id]);
    }
}
