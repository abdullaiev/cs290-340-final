import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRouterModule} from "../router/router.module";
import {MainComponent} from './main/main.component';
import {HomeComponent} from './home/home.component';

@NgModule({
    declarations: [
        MainComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRouterModule
    ],
    providers: [],
    bootstrap: [MainComponent]
})

export class AppModule {
}
