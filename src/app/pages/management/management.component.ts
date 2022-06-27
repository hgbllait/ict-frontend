import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";
import {RequestFormService} from "../../@globals/services/api/request-form";
import {BasePage} from "../../@globals/baseclasses/pages/base.page";
import {AuthenticationService} from "../../@globals/services/api/auth";

@Component({
  selector: 'pg-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})

export class ManagementComponent extends BasePage {
  page_alert = {
    shown: false
  };
  constructor(
    public authService: AuthenticationService,
    private data_service: RequestFormService,
    private titleService:Title,
  ) {
    super(authService);
    this.titleService.setTitle("Management | "+`${environment.APP_NAME}`);
  }

}
