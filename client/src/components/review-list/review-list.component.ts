import {Component, OnInit, Input} from '@angular/core';

import {ReviewService, ReviewDataSource} from "../../services/review.service";
import {User} from "../../types/user.type";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-review-list',
    templateUrl: './review-list.component.html',
    styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
    @Input() mode: string;
    @Input() id: number;

    reviews: ReviewDataSource;
    tableColumns: string[];

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
        this.tableColumns = columns;
    }

    fetchReviews() {
        this.reviews = this.reviewService.fetch(this.mode, this.id);
    }

    getStars(n: number) {
        return this.reviewService.getStars(n);
    }
}
