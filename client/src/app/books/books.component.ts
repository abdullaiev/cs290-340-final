import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs'

import {BooksService} from "../../services/books.service";
import {Book} from "../../types/book.type";

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
    // books: Observable<Array<Book>;
    tableColumns = ['title', 'name', 'author', 'year', 'rate'];

    constructor(private booksService:BooksService) {
    }

    ngOnInit() {
        // this.books = this.booksService.fetch();
    }
}
