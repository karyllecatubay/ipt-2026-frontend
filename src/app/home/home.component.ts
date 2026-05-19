import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: false
})
export class HomeComponent {
    constructor(private accountService: AccountService) {}

    get account() {
        return this.accountService.accountValue;
    }
}

export {};