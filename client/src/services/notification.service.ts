import {Injectable, Component} from '@angular/core';
import {MatSnackBar} from '@angular/material'
import {MatSnackBarConfig} from '@angular/material'


@Injectable()
export class NotificationService {

    constructor(private snackBar: MatSnackBar) {

    }

    error(message: string) {
        this.show(message, 'notification-error');
    }

    success(message: string) {
        this.show(message, 'notification-success');
    }

    info(message: string) {
        this.show(message, 'notification-info');
    }

    private show(message: string, type: string) {
        const config:MatSnackBarConfig = new MatSnackBarConfig;
        config.duration = 2000;
        config.panelClass = type;
        this.snackBar.open(message, '', config);
    }
}
