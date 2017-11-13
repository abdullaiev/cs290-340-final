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
import {AuthService} from "../services/authentication.service";
import {AppHttpInterceptor} from "../services/http.interceptor";
import {BooksService} from "../services/books.service";
import {NotificationService} from "../services/notification.service";
import { ProfileComponent } from './profile/profile.component';
import {UsersService} from "../services/users.service";

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
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRouterModule,
        AppMaterialModule
    ],
    providers: [
        AuthService,
        BooksService,
        NotificationService,
        UsersService,
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
