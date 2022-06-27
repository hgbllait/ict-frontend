import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {
    NbAuthService,
    NB_AUTH_OPTIONS,
} from '@nebular/auth';
import {AuthenticationService} from '../../@globals/services/api';
import {Router} from '@angular/router';

@Component({
    selector: 'ngx-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    redirectDelay: number = 0;
    user: any = {};
    submitted: boolean = false;
    constructor(
        private authService: AuthenticationService,
        service: NbAuthService, @Inject(NB_AUTH_OPTIONS) options: {},
        private cd: ChangeDetectorRef,
        private router: Router) {
    }

    register() {
        this.authService.register(this.user, 'auth/login').subscribe((result) => {
            if (result.isSuccess()) {
                const response = result.getResponse();
                // this.toastrService.show(response['message'], `Success`, {
                //     preventDuplicates: true, status: 'success', duration: 4000, icon: 'checkmark-square-outline',
                // });
            } else {
                const response = result.getResponse();
                // this.toastrService.show(response['data']['errors'], response['message'], {
                //     preventDuplicates: true, status: 'danger', duration: 4000, icon: 'close-square-outline',
                // });
            }

            const redirect = result.getRedirect();
            if (redirect) {
                setTimeout(() => {
                    return this.router.navigateByUrl(redirect);
                }, 1000);
            }
            this.cd.detectChanges();
        });
    }
}
