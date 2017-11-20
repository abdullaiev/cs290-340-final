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
    categories: Category[];
    newCategory: Category;
    addingCategory = false;

    constructor(private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.fetchCategories();
    }

    fetchCategories() {
        this.categoryService.fetch().subscribe(
            (categories: Category[]) => {
                this.categories = categories;
            }
        );
    }

    showAddCategory() {
        this.addingCategory = true;
        this.newCategory = new Category();
    }

    add() {
        this.categoryService.add(this.newCategory).subscribe(
            (data: any) => {
                if (data.success) {
                    this.addingCategory = false;
                    this.fetchCategories();
                }
            }
        );
    }
}
