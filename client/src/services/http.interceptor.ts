import {Inject} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs'
import 'rxjs/add/operator/do'

import {NotificationService} from "./notification.service";
import {Router} from "@angular/router";

export class AppHttpInterceptor implements HttpInterceptor {
    constructor(@Inject(NotificationService) private notificationService: NotificationService,
                @Inject(Router) private router:Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let copy: any = req.clone();
        copy.withCredentials = true;
        const observable: any = next.handle(copy);

        return observable.do(
            data => {
            },
            error => {
                if (error instanceof HttpErrorResponse) {
                    this.handleError(error);
                }
            });
    }

    handleError(data: any) {
        let message: string;

        if (data && data.status === 401) {
            this.router.navigate(['login']);
        }

        if (data && data.error && data.error.message) {
            message = data.error.message;
        } else if (data.message) {
            message = data.message;
        } else {
            message = 'Unknown Error. Please try again in a little bit.';
        }

        this.notificationService.error(message);
    }
}
