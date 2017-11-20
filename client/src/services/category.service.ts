import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'

import {environment} from '../environments/environment';
import {Category} from "../types/category.type";
import {NotificationService} from "./notification.service";

@Injectable()
export class CategoryService {
    constructor(private http: HttpClient,
                private notificationService: NotificationService) {

    }

    fetch() {
        return this.http.get(environment.api + 'categories').map(
            (data: Category[]) => {
                return data;
            }
        );
    }

    add(category: Category) {
        return this.http.post(environment.api + 'categories', category).map(
            (data: any) => {
                if (data.success) {
                    const msg = `Category "${category.name}" has been successfully added!`;
                    this.notificationService.success(msg)
                }

                return data;
            }
        );
    }
}
