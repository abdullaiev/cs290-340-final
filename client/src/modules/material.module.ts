import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatSnackBarModule
} from '@angular/material'
import {NgModule} from '@angular/core';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatSortModule,
        MatTableModule,
        MatSnackBarModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatSortModule,
        MatTableModule,
        MatSnackBarModule
    ]
})
export class AppMaterialModule {
}