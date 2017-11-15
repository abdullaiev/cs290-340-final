import {Component, OnInit, Input, ViewChild} from '@angular/core';

import {ReviewService, ReviewDataSource, ReviewsDB} from "../../services/review.service";
import {Review} from "../../types/review.type";
import {MatSort} from "@angular/material";

@Component({
    selector: 'app-review-list',
    templateUrl: './review-list.component.html',
    styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
    @Input() mode: string;
    @Input() id: number;

    @ViewChild(MatSort) sort: MatSort;

    reviews: ReviewDataSource;
    tableColumns: string[];
    qty: number;

    constructor(private reviewService: ReviewService) {
    }

    ngOnInit() {
        this.initTableColumns();
        this.fetchReviews();
    }

    initTableColumns() {
        let columns = [];
        if (this.mode === 'book') {
            columns.push('name');
        } else {
            columns.push('book')
        }
        columns.push('review');
        columns.push('rate');
        columns.push('posted');
        this.tableColumns = columns;
    }

    fetchReviews() {
        let observable = this.reviewService.fetch(this.mode, this.id);
        observable.subscribe(
            (reviews: Review[]) => {
                this.qty = reviews && reviews.length;
            }
        );
        this.reviews = new ReviewDataSource(new ReviewsDB(observable), this.sort);
    }

    getStars(n: number) {
        return this.reviewService.getStars(n);
    }
}
