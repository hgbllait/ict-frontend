import {Component, OnInit} from '@angular/core';
import {NbAuthService, NbAuthToken} from '@nebular/auth';
import {Router} from '@angular/router';

@Component({
    selector: 'ngx-auth',
    styleUrls: ['./auth.component.scss'],
    template: `
        <router-outlet></router-outlet>`,
})
export class AuthComponent implements OnInit  {
    constructor(
        private service: NbAuthService,
        private router: Router) {
    }
    ngOnInit() {
        this.service.onTokenChange().subscribe((token: NbAuthToken) => {
            if (token.isValid()) {
                this.router.navigate(['pages/dashboard']);
            }
        });
    }
}
