import {Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef} from '@angular/core';
import {MatSort} from "@angular/material";

import {BooksService, BooksDataSource} from "../../services/books.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class BookListComponent implements OnInit {
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MatSort) sort: MatSort;
    @Input() authorID: string;
    tableColumns = ['title', 'name', 'author', 'year', 'rate'];
    books: BooksDataSource;

    constructor(private bookService: BooksService) {
    }

    ngOnInit() {
        this.fetchBooks();
        this.initFilter();
    }

    fetchBooks() {
        this.books = this.bookService.fetch(this.sort, this.authorID);
    }

    initFilter() {
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                this.onFilter();
            });
    }

    onFilter() {
        if (!this.books) {
            return;
        }

        this.books.filter = this.filter.nativeElement.value;
    }
}
