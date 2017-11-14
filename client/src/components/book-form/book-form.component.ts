import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from "rxjs";

import {Book} from "../../types/book.type";
import {Category} from "../../types/category.type";
import {CategoryService} from "../../services/category.service";
import {BooksService} from "../../services/books.service";

@Component({
    selector: 'app-book-form',
    templateUrl: './book-form.component.html',
    styleUrls: ['./book-form.component.css']
})

export class BookFormComponent implements OnInit {
    @Input() mode: string;
    @Input() book: Book;
    @Output() added = new EventEmitter<boolean>();
    @Output() updated = new EventEmitter<Book>();
    @Output() cancelled = new EventEmitter<boolean>();
    categories: Observable<Category[]>;

    constructor(private categoryService: CategoryService,
                private bookService: BooksService) {
    }

    ngOnInit() {
        this.book = this.book || new Book();
        this.fetchCategories();
    }

    fetchCategories() {
        this.categories = this.categoryService.fetch();
    }

    submit() {
        if (this.mode === 'new') {
            this.add();
        } else {
            this.update();
        }
    }

    add() {
        this.bookService.add(this.book).subscribe(
            (data: any) => {
                if (data.success) {
                    this.added.emit(true);
                }
            });
    }

    update() {
        this.bookService.update(this.book).subscribe(
            (data: any) => {
                if (data.success) {
                    this.updated.emit(this.book);
                }
            }
        );
    }

    cancel() {
        this.cancelled.emit(true);
    }
}
