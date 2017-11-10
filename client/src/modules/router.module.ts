import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF, CommonModule} from "@angular/common";

import {HomeComponent} from "../app/home/home.component";
import {LoginComponent} from "../app/login/login.component";
import {SignupComponent} from "../app/signup/signup.component";
import {BooksComponent} from "../app/books/books.component";
import {AuthorsComponent} from "../app/authors/authors.component";
import {UsersComponent} from "../app/users/users.component";

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
        component: BooksComponent,
        data: {
            requiresLogin: true
        }
    },
    {
        path: 'authors',
        component: AuthorsComponent,
        data: {
            requiresLogin: true
        }
    },
    {
        path: 'users',
        component: UsersComponent,
        data: {
            requiresLogin: true
        }
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