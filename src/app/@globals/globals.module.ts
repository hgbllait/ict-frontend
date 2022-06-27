import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HelpersModule} from './helpers/helpers.module';
import {InterfacesModule} from './interfaces/interfaces.module';

import {ThemeModule} from '../@theme/theme.module';
import {SpinnerService} from "./helpers/ui/loader/loader.helper";

@NgModule({
  declarations: [
    // ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,

    HelpersModule,
    InterfacesModule,
  ],
  providers: [
    SpinnerService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class GlobalsModule {
  static forRoot(): ModuleWithProviders<GlobalsModule> {
    return {
      ngModule: GlobalsModule,
      providers: [
      ],
    };
  }
}
