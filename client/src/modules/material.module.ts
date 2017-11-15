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
    MatIconModule,
    MatSelectModule,
    MatSliderModule
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
        MatIconModule,
        MatSelectModule,
        MatSliderModule
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
        MatIconModule,
        MatSelectModule,
        MatSliderModule
    ]
})
export class AppMaterialModule {
}