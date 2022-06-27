import { NgModule } from '@angular/core';
import {AuthGuardService, AuthenticationService} from './auth';
import {AssetsService} from './assets/assets.service';
import {ServicesModule} from "../services.module";

@NgModule({
  bootstrap: [
  ],
  declarations: [
  ],
  imports: [
  ],
  exports: [
  ],
  providers: [
    AuthGuardService,
    AuthenticationService,
    ServicesModule,
    AssetsService,
  ],
})
export class ApiServiceModule { }
