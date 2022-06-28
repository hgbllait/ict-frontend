import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private authService: NbAuthService,
        private router: Router) {
    }

    canActivate() {
      this.authService.isAuthenticatedOrRefresh().subscribe(response => {
        console.log(response);
      });
        return this.authService.isAuthenticated()
            .pipe(
                tap(authenticated => {
                    if (!authenticated) {
                        this.router.navigate(['auth/login']);
                    }
                }),
            );
    }
}
