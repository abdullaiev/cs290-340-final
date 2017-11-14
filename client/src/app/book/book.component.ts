import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

import {Book} from "../../types/book.type";
import {BooksService} from "../../services/books.service";
import {Subscription} from "rxjs";
import {User} from "../../types/user.type";
import {UserService} from "../../services/user.service";
import {Review} from "../../types/review.type";

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

    constructor(private route: ActivatedRoute,
                private router: Router,
                private bookService: BooksService, private userService: UserService) {
    }

    ngOnInit() {
        this.subscribeToURLChanges();
        this.subscribeToCurrentUserChanges();
        this.getCurrentUser();
    }

    subscribeToURLChanges() {
        this.paramsSubscription = this.route.params.subscribe((params: Params) => {
            this.getBook(Number(params['id']));
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

    getBook(id: number) {
        this.bookService.get(id).subscribe(
            (book: Book) => {
                this.book = book;
            });
    }

    edit() {
        this.bookEditCopy = Object.assign({}, this.book);
        this.editing = true;
    }

    onUpdate(book: Book) {
        this.book = Object.assign({}, book);
        this.editing = false;
    }

    onCancel() {
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

    writeReview() {
        this.review = new Review();
        this.writingReview = true;
    }

    cancelReview() {
        this.writingReview = false;
    }

    postReview() {

    }


    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    }
}
