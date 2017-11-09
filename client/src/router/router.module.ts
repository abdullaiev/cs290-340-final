import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {APP_BASE_HREF, CommonModule} from "@angular/common";

import {HomeComponent} from "../app/home/home.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
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