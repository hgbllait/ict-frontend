import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DataTablesModule } from 'angular-datatables';
import { ManagementModule } from "./management/management.module";
import { SignatureComponent } from "./signature/signature.component";
import { FormRequestComponent } from "./form-request/form-request.component";
import { FlowControlRequestComponent } from "./flow-control-request/flow-control-request.component";
import { FormRequestCreateComponent } from "./form-request/create/form-request-create.component";
import { FormRequestViewComponent } from "./form-request/view/form-request-view.component";
import { ApproversModule } from "./approvers/approvers.module";
import { ResizableModule } from 'angular-resizable-element';
import {ProfileComponent} from "./profile/profile.component";
import {FormRequestViewCreateComponent} from "./form-request/view/create/form-request-view-create.component";
import {DocumentComponent} from "./document/document.component";

@NgModule({
  imports: [
    ResizableModule,
    PagesRoutingModule,
    ThemeModule,
    MiscellaneousModule,
    DataTablesModule,
    ManagementModule,
    ApproversModule
  ],
  exports: [
    FormRequestViewComponent
  ],
  declarations: [
    FormRequestComponent,
    FlowControlRequestComponent,
    FormRequestCreateComponent,
    FormRequestViewComponent,
    FormRequestViewCreateComponent,
    PagesComponent,
    DashboardComponent,
    ProfileComponent,
    SignatureComponent,
    DocumentComponent
  ]
})
export class PagesModule {
}
