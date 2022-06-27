import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import {NbAuthModule} from '@nebular/auth';

import { FormRoutingModule } from './form-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinkComponent } from './link/link.component';
import { RequestSectionComponent } from "./request-section/request-section.component";
import { FormComponent } from './form.component';
import { ThemeModule } from "../@theme/theme.module";
import {PagesModule} from "../pages/pages.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormRoutingModule,
    ReactiveFormsModule,
    NbAuthModule,
    ThemeModule,
    PagesModule
  ],
    declarations: [
        FormComponent,
        LinkComponent,
        RequestSectionComponent
    ],
})
export class FormModule {

}
