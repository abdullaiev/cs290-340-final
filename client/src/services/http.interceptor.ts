import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/do'

export class AppHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let copy:any = req.clone();
        copy.withCredentials = true;
        return next.handle(copy).do(event => {}, error => {
            if(error instanceof HttpErrorResponse){
                this.handleError(error);
            }
        });
    }

    handleError(data:any) {
        if (data && data.error && data.error.message) {
            alert(data.error.message);
        } else if (data.message) {
            alert(data.message);
        } else {
            alert('Unknown Error. Please try again in a little bit.')
        }
    }
}
