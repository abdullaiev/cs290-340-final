import {Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef} from '@angular/core';
import {MatSort} from "@angular/material";
import {Observable} from "rxjs";

import {UsersService, UsersDataSource} from "../../services/users.service";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
    @Input() authors:boolean;
    @ViewChild('search') search: ElementRef;
    @ViewChild(MatSort) sort: MatSort;

    users: UsersDataSource;
    tableColumns = ['name', 'city', 'country'];

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.fetchUsers();
        this.initSearch();
    }

    fetchUsers() {
        this.users = this.usersService.fetch(this.sort, this.authors);
    }

    initSearch() {
        Observable.fromEvent(this.search.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                this.onSearch();
            });
    }

    onSearch() {
        if (!this.users) {
            return;
        }

        this.users.search = this.search.nativeElement.value;
    }
}
