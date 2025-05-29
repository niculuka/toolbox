import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {
    email: string = "example@gmail.ro"
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }
}
