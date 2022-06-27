import {AfterViewInit, Component} from '@angular/core';
import {RequestFormService} from "../../../@globals/services/api/request-form";
import {StandardResponse, User} from '../../../@globals/models';
import {AuthenticationService} from "../../../@globals/services/api/auth";
import {Employee} from "../../../@globals/models/employee.model";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements AfterViewInit {

  active_user: Employee;
  user: User;
  title: string;

  constructor(private data_service: RequestFormService,
              private authService: AuthenticationService,
              private router: Router) {
    this.title = `${environment.APP_NAME}`;
    this.user = this.authService.currentUserValue.user;

  }

  ngAfterViewInit() {
    this.updateUserData();
  }

  fetchUser() {
    return this.data_service.execute(
      {
        slug: 'v1.employees.fetch',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        id: this.user.employee_id,
        __response: {
          200: 'Successfully retrieved user information',
        },
      },
    );
  }

  logout(): void {
    this.authService
      .logout('auth/login')
      .subscribe((result) => {
        if(result.isSuccess()){
          const redirect = result.getRedirect();
          if (redirect) {
            setTimeout(() => {
              return this.router.navigateByUrl(redirect);
            }, 1000);
          }
        }
    });
  }

  updateUserData() {
    this.fetchUser()
      .subscribe((result: StandardResponse) => {
        if ( result.code === 200 ) {
          this.active_user = result.data.employee[0];
        }
      });
  }
}
