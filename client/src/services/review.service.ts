import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'

import {environment} from '../environments/environment';
import {Review} from "../types/review.type";
import {NotificationService} from "./notification.service";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs";

@Injectable()
export class ReviewService {
    constructor(private http: HttpClient,
                private notificationService: NotificationService) {

    }

    fetch(type: string, id: number) {
        const URL = environment.api + 'reviews/' + type + '/' + id;
        const observable = this.http.get(URL).map(
            (reviews: Review[]) => {
                return reviews;
            }
        );
        return observable;
    }

    add(review: Review) {
        const URL = environment.api + 'reviews/book/' + review.book_id;

        return this.http.post(URL, review).map(
            (data: any) => {
                if (data.success) {
                    const message = `"The review has been successfully added!`;
                    this.notificationService.success(message);
                }

                return data;
            }
        );
    }

    update(review: Review) {
        const URL = environment.api + 'reviews/' + review.id;

        return this.http.put(URL, review).map(
            (data: any) => {
                if (data.success) {
                    const message = `The review has been successfully updated!`;
                    this.notificationService.success(message);
                }

                return data;
            }
        );
    }

    getStars(rate) {
        let stars = [];
        let count = 5;

        while (rate > 0 || count > 0) {
            count--;
            rate--;

            if (rate >= 0) {
                stars.push('star');
            } else if (rate >= -0.5) {
                stars.push('star_half');
            } else {
                stars.push('star_border')
            }
        }

        return stars;
    }
}

export class ReviewDataSource extends DataSource<any> {
    constructor(private observable: Observable<Review[]>) {
        super();
    }

    connect(): Observable<Review[]> {
        return this.observable;
    }

    disconnect() {}
}
