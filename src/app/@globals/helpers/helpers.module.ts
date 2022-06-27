import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {VariablesHelper} from "./objects/variables.helper";
import {FormHelper} from "./ui/form.helpers";
import {CustomComponentsHelper} from "./ui/custom_components.helpers";
import {DevLogHelper} from "./develop/dev.logger.helpers";
import {StringHelper} from "./native/string.helpers";
import {SpinnerService} from "./ui/loader/loader.helper";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
  ],
  providers: [
    CustomComponentsHelper,
    DevLogHelper,
    FormHelper,
    StringHelper,
    VariablesHelper,
    SpinnerService
  ]
})
export class HelpersModule { }
