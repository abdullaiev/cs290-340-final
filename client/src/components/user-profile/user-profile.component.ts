import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';

import User from "../../types/user.type";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class UserProfileComponent implements OnInit {
    @Input() user: User;
    @Input() mode: string;
    @Output() submitted = new EventEmitter<User>();
    @Output() cancelled = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit() {
        this.user = this.user || new User();
    }

    submit() {
        this.submitted.emit(this.user);
    }

    cancel() {
        this.cancelled.emit(true);
    }
}
