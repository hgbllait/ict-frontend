import { Component } from '@angular/core';
import {ISpinnerState, SpinnerService} from "../../../@globals/helpers/ui/loader/loader.helper";
import {Subscription} from "rxjs";

@Component({
  selector: 'ngx-main-layout',
  styleUrls: ['./main.layout.scss'],
  template: `
    <div class="container-scroller">
      <ngx-header></ngx-header>
      <div class="container-fluid page-body-wrapper">
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="container">
              <ng-content select="router-outlet"></ng-content>
            </div>
          </div>
          <ngx-footer></ngx-footer>
        </div>
      </div>
    </div>
  `,
})
export class MainLayoutComponent {}
