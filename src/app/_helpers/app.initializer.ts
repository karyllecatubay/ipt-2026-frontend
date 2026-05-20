import { AccountService } from '@app/_services';

export function appInitializer(accountService: AccountService) {
    return () => new Promise((resolve: any) => {
        accountService.refreshToken()
            .subscribe({
                error: () => resolve()
            })
            .add(resolve);
    });
}

export {};