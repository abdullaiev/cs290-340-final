import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from "rxjs";
import {Subscription} from "rxjs";

import {Book} from "../../types/book.type";
import {Category} from "../../types/category.type";
import {CategoryService} from "../../services/category.service";
import {BooksService} from "../../services/books.service";
import {User} from "../../types/user.type";
import {Author} from "../../types/author.type";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-book-form',
    templateUrl: './book-form.component.html',
    styleUrls: ['./book-form.component.css']
})

export class BookFormComponent implements OnInit, OnDestroy {
    @Input() mode: string;
    @Input() book: Book;

    @Output() added = new EventEmitter<boolean>();
    @Output() updated = new EventEmitter<Book>();
    @Output() cancelled = new EventEmitter<boolean>();
    categories: Observable<Category[]>;
    currentUser: User;
    authorsCopy: Author[];
    userSubscription: Subscription;

    constructor(private categoryService: CategoryService,
                private bookService: BooksService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.initData();
        this.fetchCategories();
        this.getCurrentUser();
        this.initAuthorsArray();
    }

    initData() {
        this.book = this.book || new Book();

        this.book.author_changes = {
            added: [],
            removed: []
        };
    }

    fetchCategories() {
        this.categories = this.categoryService.fetch();
    }

    getCurrentUser() {
        this.currentUser = this.userService.getCurrentUser();
        this.userSubscription = this.userService.userEmitter.subscribe(
            (user: User) => {
                this.currentUser = user;
                this.initAuthorsArray();
            })
    }

    initAuthorsArray() {
        if (this.mode === 'new' && this.currentUser) {
            const author: Author = <Author>{
                author_id: this.currentUser.id,
                first_name: this.currentUser.first_name,
                last_name: this.currentUser.last_name
            };
            this.book.authors = [];
            this.book.authors.push(author);
        }
    }

    addAuthor(user: User) {
        const newAuthor: Author = {
            author_id: user.id,
            first_name: user.first_name,
            last_name: user.last_name
        };

        for (let author of this.book.authors) {
            if (author.author_id == newAuthor.author_id) {
                return;
            }
        }

        this.book.authors.push(newAuthor);

        let removed = this.book.author_changes.removed;
        for (let i = 0; i < removed.length; i++) {
            if (removed[i].author_id === newAuthor.author_id) {
                removed.splice(i, 1);
                return;
            }
        }

        this.book.author_changes.added.push(newAuthor);
    }

    removeAuthor(author) {
        const index = this.book.authors.indexOf(author);
        this.book.authors.splice(index, 1);

        let added = this.book.author_changes.added;
        for (let i = 0; i < added.length; i++) {
            if (added[i].author_id === author.author_id) {
                added.splice(i, 1);
                return;
            }
        }

        this.book.author_changes.removed.push(author);
    }

    submit() {
        if (this.mode === 'new') {
            this.add();
        } else {
            this.update();
        }
    }

    add() {
        this.bookService.add(this.book).subscribe(
            (data: any) => {
                if (data.success) {
                    this.added.emit(true);
                }
            });
    }

    update() {
        this.bookService.update(this.book).subscribe(
            (data: any) => {
                if (data.success) {
                    this.updated.emit(this.book);
                }
            }
        );
    }

    cancel() {
        this.cancelled.emit(true);
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
