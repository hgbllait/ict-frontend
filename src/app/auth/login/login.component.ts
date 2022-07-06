import {ChangeDetectorRef, Component} from '@angular/core';
import {AuthenticationService} from '../../@globals/services/api';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {Title} from "@angular/platform-browser";
import {Router} from '@angular/router';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'ngx-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    redirectDelay: number = 0;
    user: any = {};
    submitted: boolean = false;
    showPassword: boolean;
    rememberMe = false;
    alert: any = {
      show: false
    };

    loginForm: FormGroup;
    constructor(
        private authService: AuthenticationService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private fb: FormBuilder,
        private titleService:Title) {
      this.titleService.setTitle("Login | "+`${environment.APP_NAME}`);
      this.createForm();
    }

    createForm() {
      this.loginForm = this.fb.group({
        employee_id: ['', Validators.required ],
        password: ['', Validators.required ]
      });
    }

    login() {
        this.submitted = true;
        if (this.loginForm.invalid) {
          return;
        }

        this.authService.login(this.loginForm.value, '/').subscribe((result) => {
            this.submitted = false;
            if (result.isSuccess()) {
                const response = result.getResponse();
                this.alert = {
                  shown: true,
                  messages: response.message,
                  type: 'success',
                };
            } else {
                const response = result.getResponse();
                this.alert = {
                  shown: true,
                  messages: response.message,
                  type: 'danger',
                };
            }
            const redirect = result.getRedirect();
            if (redirect) {
                setTimeout(() => {
                    return this.router.navigateByUrl(redirect);
                }, this.redirectDelay);
            }
            this.cd.detectChanges();
        });
    }

    changeFieldType() {
      this.showPassword = !this.showPassword;
    }
}
