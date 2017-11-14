import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http'

import {AppRouterModule} from "../modules/router.module";
import {MainComponent} from './main/main.component';
import {HomeComponent} from './home/home.component';
import {AppMaterialModule} from "../modules/material.module";
import {NavbarComponent} from '../components/navbar/navbar.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {BooksComponent} from './books/books.component';
import {AuthorsComponent} from './authors/authors.component';
import {UsersComponent} from './users/users.component';
import {UserService} from "../services/user.service";
import {AppHttpInterceptor} from "../services/http.interceptor";
import {BooksService} from "../services/books.service";
import {NotificationService} from "../services/notification.service";
import {UserComponent} from './user/user.component';
import {UserProfileComponent} from '../components/user-profile/user-profile.component';
import {AddBookComponent} from './add-book/add-book.component';
import {CategoryService} from "../services/category.service";
import { BookListComponent } from '../components/book-list/book-list.component';
import { ReviewListComponent } from '../components/review-list/review-list.component';

@NgModule({
    declarations: [
        MainComponent,
        HomeComponent,
        NavbarComponent,
        LoginComponent,
        SignupComponent,
        BooksComponent,
        AuthorsComponent,
        UsersComponent,
        UserComponent,
        UserProfileComponent,
        AddBookComponent,
        BookListComponent,
        ReviewListComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRouterModule,
        AppMaterialModule
    ],
    providers: [
        UserService,
        BooksService,
        NotificationService,
        CategoryService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHttpInterceptor,
            multi: true
        }
    ],
    bootstrap: [MainComponent]
})

export class AppModule {
}
