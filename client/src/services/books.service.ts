import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'

import {environment} from '../environments/environment';
import {Book} from "../types/book.type";
import {NotificationService} from "./notification.service";

@Injectable()
export class BooksService {
    constructor(private http: HttpClient,
                private notificationService: NotificationService) {

    }

    fetch() {
        return this.http.get(environment.api + 'books');
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
}

