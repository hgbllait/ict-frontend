import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ManagementComponent } from "./management/management.component";
import { SignatureComponent } from "./signature/signature.component";
import { FormRequestComponent } from "./form-request/form-request.component";
import { FlowControlRequestComponent } from "./flow-control-request/flow-control-request.component";
import { FormRequestCreateComponent } from "./form-request/create/form-request-create.component";
import { ApproversComponent } from "./approvers/approvers.component";
import { FormRequestViewComponent } from "./form-request/view/form-request-view.component";
import {ProfileComponent} from "./profile/profile.component";
import {FormRequestViewCreateComponent} from "./form-request/view/create/form-request-view-create.component";
import {DocumentComponent} from "./document/document.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'form-request',
      component: FormRequestComponent,
    },
    {
      path: 'document/:link',
      component: DocumentComponent,
    },
    {
      path: 'form-request/create',
      component: FormRequestCreateComponent,
    },
    {
      path: 'form-request/view/:id',
      component: FormRequestViewComponent,
    },
    {
      path: 'form-request/view/:id/create',
      component: FormRequestViewCreateComponent,
    },
    {
      path: 'flow-control-request',
      component: FlowControlRequestComponent,
    },
    {
      path: 'management',
      component: ManagementComponent,
    },
    {
      path: 'approvers',
      component: ApproversComponent,
    },
    {
      path: 'signature',
      component: SignatureComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
