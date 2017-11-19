import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'

import {environment} from '../environments/environment';
import {Review} from "../types/review.type";
import {NotificationService} from "./notification.service";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {MatSort} from "@angular/material";

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

    getStars(rating) {
        let stars = [];
        let count = 5;

        while (rating > 0 || count > 0) {
            count--;
            rating--;

            if (rating >= 0) {
                stars.push('star');
            } else if (rating >= -0.5) {
                stars.push('star_half');
            } else {
                stars.push('star_border')
            }
        }

        return stars;
    }
}

export class ReviewsDB {
    change: BehaviorSubject<Review[]> = new BehaviorSubject<Review[]>([]);

    constructor(observable: Observable<Review[]>) {
        observable.subscribe(
            (reviews: Review[]) => {
                this.change.next(reviews);
            }
        );
    }

    get data(): Review[] {
        return this.change.value;
    }
}

export class ReviewDataSource extends DataSource<any> {
    constructor(private reviewDB: ReviewsDB,
                private sort: MatSort) {
        super();
    }

    connect(): Observable<Review[]> {
        const changes = [
            this.reviewDB.change,
            this.sort.sortChange
        ];

        return Observable.merge(...changes).map(
            () => {
                return this.getSortedData();
            });
    }

    /*
     this function follows an example at Angular Material website:
     https://material.angular.io/components/table/overview#sorting
     */
    getSortedData() {
        const data = this.reviewDB.data.slice();

        if (!this.sort.active || this.sort.direction == '') {
            return data;
        }

        return data.sort((a, b) => {
            let propA: number|string = '';
            let propB: number|string = '';

            switch (this.sort.active) {
                case 'name':
                    [propA, propB] = [a.first_name + a.last_name, b.first_name + b.last_name];
                    break;
                case 'book':
                    [propA, propB] = [a.book_title, b.book_title];
                    break;
                case 'posted':
                    [propA, propB] = [a.posted, b.posted];
                    break;
            }

            let valueA = isNaN(+propA) ? propA : +propA;
            let valueB = isNaN(+propB) ? propB : +propB;

            return (valueA < valueB ? -1 : 1) * (this.sort.direction == 'asc' ? 1 : -1);
        });

    }

    disconnect() {
    }
}
