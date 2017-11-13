import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule
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
        MatSnackBarModule,
        MatMenuModule,
        MatIconModule
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
        MatSnackBarModule,
        MatMenuModule,
        MatIconModule
    ]
})
export class AppMaterialModule {
}