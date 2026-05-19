import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '../../_services/account.service';
import { AlertService } from '../../_services/alert.service';

@Component({ templateUrl: 'list.component.html', standalone: false })
export class ListComponent implements OnInit, OnDestroy {
    accounts: any[] = [];
    loading = false;

    private loadTimeoutId?: number;

    constructor(
        private accountService: AccountService,
        private alertService: AlertService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.loading = true;
        this.cdr.detectChanges();

        this.loadTimeoutId = window.setTimeout(() => {
            if (this.loading) {
                this.loading = false;
                this.accounts = [];
                this.alertService.error('Request timed out');
                this.cdr.detectChanges();
            }
        }, 10000);

        this.accountService.getAll()
            .pipe(first())
            .subscribe({
                next: (accounts: any[]) => {
                    this.accounts = accounts;
                    this.loading = false;
                    if (this.loadTimeoutId) {
                        window.clearTimeout(this.loadTimeoutId);
                        this.loadTimeoutId = undefined;
                    }
                    this.cdr.detectChanges();
                },
                error: (error: any) => {
                    this.alertService.error(error);
                    this.accounts = [];
                    this.loading = false;
                    this.cdr.detectChanges();
                }
            });
    }

    ngOnDestroy() {
        if (this.loadTimeoutId) {
            window.clearTimeout(this.loadTimeoutId);
            this.loadTimeoutId = undefined;
        }
    }

    deleteAccount(id: string) {
        const account = this.accounts.find(x => x.id === id);
        if (!account) return;

        account.isDeleting = true;
        this.cdr.detectChanges();

        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.accounts = this.accounts.filter(x => x.id !== id);
                this.cdr.detectChanges();
            });
    }
}