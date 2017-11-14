import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'

import {environment} from '../environments/environment';
import {Book} from "../types/book.type";
import {NotificationService} from "./notification.service";
import {DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject} from "rxjs";
import {MatSort} from "@angular/material";

@Injectable()
export class BooksService {
    constructor(private http: HttpClient,
                private notificationService: NotificationService) {

    }

    fetch(sort: MatSort, authorID?: string) {
        let URL = environment.api + 'books';

        if (authorID) {
            URL += '/author/' + authorID;
        }

        const observable = this.http.get(URL).map(
            (data: Book[]) => {
                return data;
            }
        );

        return new BooksDataSource(new BooksDB(observable), sort);
    }

    get(id: number) {
        return this.http.get(environment.api + 'books/' + id);
    }

    add(book: Book) {
        return this.http.post(environment.api + 'books', book).map(
            (data: any) => {
                if (data.success) {
                    const message = `"${book.title}" has been successfully added!`;
                    this.notificationService.success(message);
                }

                return data;
            }
        );
    }

    update(book: Book) {
        return this.http.put(environment.api + 'books/' + book.id, book).map(
            (data: any) => {
                if (data.success) {
                    const message = `${book.title} has been successfully updated!`;
                    this.notificationService.success(message);
                }

                return data;
            }
        );
    }

    delete(book) {
        return this.http.delete(environment.api + 'books/' + book.id).map(
            (data: any) => {
                if (data.success) {
                    const message = `${book.title} has been successfully deleted!`;
                    this.notificationService.info(message);
                }

                return data;
            }
        );
    }
}

export class BooksDB {
    change: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

    constructor(observable: Observable<Book[]>) {
        observable.subscribe(
            (books: Book[]) => {
                this.change.next(books);
            }
        );
    }

    get data(): Book[] {
        return this.change.value;
    }
}

export class BooksDataSource extends DataSource<any> {
    filterChange = new BehaviorSubject('');

    get filter(): string {
        return this.filterChange.value;
    }

    set filter(filter: string) {
        this.filterChange.next(filter);
    }

    constructor(private booksDB: BooksDB,
                private sort: MatSort) {
        super();
    }

    connect(): Observable<Book[]> {
        const changes = [
            this.booksDB.change,
            this.sort.sortChange,
            this.filterChange
        ];

        return Observable.merge(...changes).map(
            () => {
                return this.getSortedData().filter((book: Book) => {
                    return this.filterMatch(book);
                });
            });
    }

    /*
     this function follows an example at Angular Material website:
     https://material.angular.io/components/table/overview#sorting
     */
    getSortedData() {
        const data = this.booksDB.data.slice();

        if (!this.sort.active || this.sort.direction == '') {
            return data;
        }

        return data.sort((a, b) => {
            let propA: number|string = '';
            let propB: number|string = '';

            switch (this.sort.active) {
                case 'title':
                    [propA, propB] = [a.title, b.title];
                    break;
                case 'name':
                    [propA, propB] = [a.category_name, b.category_name];
                    break;
                case 'author':
                    [propA, propB] = [a.first_name + a.last_name, b.first_name + b.last_name];
                    break;
                case 'year':
                    [propA, propB] = [a.year, b.year];
                    break;
                case 'rate':
                    [propA, propB] = [a.rate, b.rate];
                    break;
            }

            let valueA = isNaN(+propA) ? propA : +propA;
            let valueB = isNaN(+propB) ? propB : +propB;

            return (valueA < valueB ? -1 : 1) * (this.sort.direction == 'asc' ? 1 : -1);
        });
    }

    filterMatch(book: Book):boolean {
        let searchStr = `${book.title} ${book.category_name} ${book.first_name} ${book.last_name} ${book.year}`;
        let query = this.filter.toLowerCase();
        searchStr = searchStr.toLowerCase();
        return searchStr.indexOf(query) != -1;
    }

    disconnect() {
    }
}

