import {Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef} from '@angular/core';
import {MatSort} from "@angular/material";

import {UsersService, UsersDataSource} from "../../services/users.service";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
    @Input() authors:boolean;
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MatSort) sort: MatSort;
    users: UsersDataSource;
    tableColumns = ['name', 'city', 'country'];

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.fetchUsers();
    }

    fetchUsers() {
        this.users = this.usersService.fetch(this.sort, this.authors);
    }
}
