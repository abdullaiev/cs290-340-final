import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {Review} from "../../types/review.type";
import {CategoryService} from "../../services/category.service";
import {ReviewService} from "../../services/review.service";

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})

export class ReviewFormComponent implements OnInit {
  @Input() mode: string;
  @Input() review: Review;
  @Input() bookID: number;
  @Output() added = new EventEmitter<boolean>();
  @Output() updated = new EventEmitter<Review>();
  @Output() cancelled = new EventEmitter<boolean>();

  constructor(private categoryService: CategoryService,
              private reviewService: ReviewService) {
  }

  ngOnInit() {
    if (!this.review) {
      this.review = new Review();
      this.review.rate = 1;
      this.review.book_id = this.bookID;
    }
  }

  submit() {
    if (this.mode === 'new') {
      this.add();
    } else {
      this.update();
    }
  }

  add() {
    this.reviewService.add(this.review).subscribe(
        (data: any) => {
          if (data.success) {
            this.added.emit(true);
          }
        });
  }

  update() {
    this.reviewService.update(this.review).subscribe(
        (data: any) => {
          if (data.success) {
            this.updated.emit(this.review);
          }
        }
    );
  }

  cancel() {
    this.cancelled.emit(true);
  }

  getStars() {
    return this.reviewService.getStars(this.review.rate);
  }
}
