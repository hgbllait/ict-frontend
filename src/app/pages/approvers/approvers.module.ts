import { NgModule } from '@angular/core';

import { ListComponent } from './list/list.component';
import { LinkComponent } from './link/link.component';
import { ApproversComponent } from "./approvers.component";
import { ThemeModule } from "../../@theme/theme.module";

@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [
    ListComponent,
    LinkComponent,
    ApproversComponent
  ],
})
export class ApproversModule {
}
