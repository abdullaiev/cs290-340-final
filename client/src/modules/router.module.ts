import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF, CommonModule} from "@angular/common";

import {HomeComponent} from "../app/home/home.component";
import {LoginComponent} from "../app/login/login.component";
import {SignupComponent} from "../app/signup/signup.component";
import {BooksComponent} from "../app/books/books.component";
import {AuthorsComponent} from "../app/authors/authors.component";
import {UsersComponent} from "../app/users/users.component";
import {UserComponent} from "../app/user/user.component";
import {AddBookComponent} from "../app/add-book/add-book.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'books',
        component: BooksComponent
    },
    {
        path: 'add-book',
        component: AddBookComponent
    },
    {
        path: 'authors',
        component: AuthorsComponent
    },
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: 'users/:id',
        component: UserComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        {
            provide: APP_BASE_HREF,
            useValue: '/'
        }
    ],
    exports: [
        RouterModule
    ]
})

export class AppRouterModule {

}