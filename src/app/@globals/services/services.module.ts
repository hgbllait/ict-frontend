import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {SpinnerService} from "../helpers/ui/loader/loader.helper";


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

    SpinnerService,
  ]
})
export class ServicesModule { }
