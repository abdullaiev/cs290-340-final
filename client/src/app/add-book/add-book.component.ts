import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";

import {Book} from "../../types/book.type";
import {Category} from "../../types/category.type";
import {CategoryService} from "../../services/category.service";
import {BooksService} from "../../services/books.service";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.css']
})

export class AddBookComponent implements OnInit {
    book: Book = new Book();
    categories: Observable<Category[]>;

    constructor(private router: Router,
                private userService: UserService,
                private categoryService: CategoryService,
                private bookService: BooksService) {
    }

    ngOnInit() {
        this.fetchCategories();
    }

    fetchCategories() {
        this.categories = this.categoryService.fetch();
    }

    submit() {
        this.bookService.add(this.book).subscribe(
            (data: any) => {
                if (data.success) {
                    const id = this.userService.getCurrentUser().id;
                    this.router.navigate(['users', id]);
                }
            });
    }
}
