import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule} from '@angular/material'
import {NgModule} from '@angular/core';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule
    ]
})
export class AppMaterialModule {
}