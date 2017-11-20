import {Component, OnInit} from '@angular/core';

import {CategoryService} from "../../services/category.service";
import {Category} from "../../types/category.type";
import {Observable} from "rxjs";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
    categories: Observable<Category[]>;

    constructor(private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.categories = this.categoryService.fetch();
    }
}
