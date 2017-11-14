import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'

import {environment} from '../environments/environment';
import {User} from "../types/user.type";
import {DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject} from "rxjs";
import {MatSort} from "@angular/material";

@Injectable()
export class UsersService {
    constructor(private http: HttpClient) {

    }

    fetch(sort: MatSort, authors?: boolean) {
        let URL = environment.api + 'users';

        if (authors) {
            URL += '/authors';
        } else {
            URL += '/all';
        }

        const observable = this.http.get(URL).map(
            (data: User[]) => {
                return data;
            }
        );

        return new UsersDataSource(new UsersDB(observable), sort);
    }
}

export class UsersDB {
    change: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

    constructor(observable: Observable<User[]>) {
        observable.subscribe(
            (users: User[]) => {
                this.change.next(users);
            }
        );
    }

    get data(): User[] {
        return this.change.value;
    }
}

export class UsersDataSource extends DataSource<any> {
    filterChange = new BehaviorSubject('');

    get filter(): string {
        return this.filterChange.value;
    }

    set filter(filter: string) {
        this.filterChange.next(filter);
    }

    constructor(private usersDB: UsersDB,
                private sort: MatSort) {
        super();
    }

    connect(): Observable<User[]> {
        const changes = [
            this.usersDB.change,
            this.sort.sortChange,
            this.filterChange
        ];

        return Observable.merge(...changes).map(
            () => {
                return this.getSortedData().filter((user: User) => {
                    return this.filterMatch(user);
                });
            });
    }

    /*
     this function follows an example at Angular Material website:
     https://material.angular.io/components/table/overview#sorting
     */
    getSortedData() {
        const data = this.usersDB.data.slice();

        if (!this.sort.active || this.sort.direction == '') {
            return data;
        }

        return data.sort((a, b) => {
            let propA: number|string = '';
            let propB: number|string = '';

            switch (this.sort.active) {
                case 'name':
                    [propA, propB] = [a.first_name + a.last_name, b.first_name + b.last_name];
                    break;
                case 'city':
                    [propA, propB] = [a.city, b.city];
                    break;
                case 'country':
                    [propA, propB] = [a.country, b.country];
                    break;
            }

            let valueA = isNaN(+propA) ? propA : +propA;
            let valueB = isNaN(+propB) ? propB : +propB;

            return (valueA < valueB ? -1 : 1) * (this.sort.direction == 'asc' ? 1 : -1);
        });
    }

    filterMatch(user: User):boolean {
        let searchStr = `${user.first_name} ${user.last_name} ${user.city} ${user.country}`;
        let query = this.filter.toLowerCase();
        searchStr = searchStr.toLowerCase();
        return searchStr.indexOf(query) != -1;
    }

    disconnect() {
    }
}

