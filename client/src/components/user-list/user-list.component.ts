import {Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import {MatSort} from "@angular/material";
import {Observable} from "rxjs";

import {UsersService, UsersDataSource} from "../../services/users.service";
import {User} from "../../types/user.type";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
    @Input() authors:boolean;
    @Input() select:boolean;
    @Output() selected = new EventEmitter<User>();

    @ViewChild('search') search: ElementRef;
    @ViewChild(MatSort) sort: MatSort;

    users: UsersDataSource;
    tableColumns = ['name', 'city', 'country'];

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.fetchUsers();
        this.initSearch();
        this.initTable();
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

    initTable() {
        if (this.authors) {
            this.tableColumns.push('books');
        } else {
            this.tableColumns.push('reviews');
        }

        if (this.select) {
            this.tableColumns.push('select');
        }
    }

    onSearch() {
        if (!this.users) {
            return;
        }

        this.users.search = this.search.nativeElement.value;
    }

    emitSelected(author, $event: Event) {
        $event.stopPropagation();
        this.selected.emit(author);
    }
}
