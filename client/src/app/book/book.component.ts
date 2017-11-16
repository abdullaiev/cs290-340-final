import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

import {Book} from "../../types/book.type";
import {BooksService} from "../../services/books.service";
import {Subscription} from "rxjs";
import {User} from "../../types/user.type";
import {UserService} from "../../services/user.service";
import {Review} from "../../types/review.type";
import {ReviewListComponent} from "../../components/review-list/review-list.component";
import {ReviewService} from "../../services/review.service";

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {
    editing: boolean = false;
    writingReview: boolean = false;
    book: Book;
    user: User;
    review: Review;
    bookEditCopy: Book;
    userSubscription: Subscription;
    paramsSubscription: Subscription;
    id: number;

    @ViewChild(ReviewListComponent) private reviewList: ReviewListComponent;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private bookService: BooksService,
                private userService: UserService,
                private reviewService: ReviewService) {
    }

    ngOnInit() {
        this.subscribeToURLChanges();
        this.subscribeToCurrentUserChanges();
        this.getCurrentUser();
    }

    subscribeToURLChanges() {
        this.paramsSubscription = this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.getBook();
        });
    }

    subscribeToCurrentUserChanges() {
        this.userSubscription = this.userService.userEmitter.subscribe((user: User) => {
            this.user = user;
        });
    }

    getCurrentUser() {
        this.user = this.userService.getCurrentUser();
    }

    getBook() {
        this.bookService.get(this.id).subscribe(
            (book: Book) => {
                this.book = book;
            });
    }

    edit() {
        this.bookEditCopy = Object.assign({}, this.book);
        this.editing = true;
    }

    onUpdate() {
        this.getBook();
        this.editing = false;
    }

    onCancel() {
        this.getBook();
        this.editing = false;
    }


    delete() {
        const message = 'Once deleted the book cannot be restored. Are you sure you want to proceed?';
        let isUserSure = confirm(message);

        if (!isUserSure) {
            return;
        }

        this.bookService.delete(this.book).subscribe(
            (data: any) => {
                if (data.success) {
                    this.router.navigate(['books']);
                }
            }
        );
    }

    onReviewAdd() {
        this.writingReview = false;
        this.reviewList.fetchReviews();
        this.getBook();
    }

    getStars() {
        const rate = this.book && this.book.rate;
        return this.reviewService.getStars(rate);
    }

    isAuthor() {
        const authors = this.book && this.book.authors;

        if (!authors || !this.user) {
            return;
        }

        for (let author of authors) {
            if (this.user.id == author.author_id) {
                return true;
            }
        }

        return false;
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    }
}
