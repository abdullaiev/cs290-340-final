import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {MatSort} from "@angular/material";
import {Observable} from "rxjs";

import {BooksService, BooksDataSource, BooksDB} from "../../services/books.service";
import {ReviewService} from "../../services/review.service";
import {Book} from "../../types/book.type";

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit {
    @ViewChild('search') search: ElementRef;
    @ViewChild(MatSort) sort: MatSort;

    @Input() authorID: number;
    @Input() categoryID: number;

    tableColumns = ['title', 'name', 'author', 'year', 'rating'];
    books: BooksDataSource;
    qty: number;

    constructor(private bookService: BooksService,
                private reviewService: ReviewService) {
    }

    ngOnInit() {
        this.fetchBooks();
        this.initSearch();
    }

    fetchBooks() {
        let observable = this.bookService.fetch(this.authorID, this.categoryID);

        observable.subscribe(
            (books: Book[]) => {
                this.qty = books && books.length;
            }
        );

        this.books = new BooksDataSource(new BooksDB(observable), this.sort);
    }

    initSearch() {
        Observable.fromEvent(this.search.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                this.onSearch();
            });
    }

    onSearch() {
        if (!this.books) {
            return;
        }

        this.books.search = this.search.nativeElement.value;
    }

    getStars(rating) {
        return this.reviewService.getStars(rating);
    }
}
