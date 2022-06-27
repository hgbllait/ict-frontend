import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";
import {RequestFormService} from "../../@globals/services/api/request-form";
import {BasePage} from "../../@globals/baseclasses/pages/base.page";
import {AuthenticationService} from "../../@globals/services/api/auth";

@Component({
  selector: 'pg-approvers',
  templateUrl: './approvers.component.html',
  styleUrls: ['./approvers.component.scss']
})

export class ApproversComponent extends BasePage {
  page_alert = {
    shown: false
  };
  constructor(
    public authService: AuthenticationService,
    private data_service: RequestFormService,
    private titleService:Title,
  ) {
    super(authService);
    this.titleService.setTitle("Approvers | "+`${environment.APP_NAME}`);
  }

}
