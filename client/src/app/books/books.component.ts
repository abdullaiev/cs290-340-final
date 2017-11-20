import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Params, ActivatedRoute} from "@angular/router";
import {Category} from "../../types/category.type";
import {CategoryService} from "../../services/category.service";

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
    paramsSubscription: Subscription;
    categoryID: number;
    categories: Category[];

    constructor(private route: ActivatedRoute,
                private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.subscribeToURLChanges();
        this.fetchCategories();
    }

    subscribeToURLChanges() {
        this.paramsSubscription = this.route.params.subscribe((params: Params) => {
            this.categoryID = params['id'];
        });
    }

    fetchCategories() {
        this.categoryService.fetch().subscribe(
            (categories: Category[]) => {
                this.categories = categories;
            }
        );
    }

    getCategoryName() {
        if (!this.categories) {
            return '';
        }

        for (let category of this.categories) {
            if (category.id == this.categoryID) {
                return category.name;
            }
        }

        return '';
    }
}
