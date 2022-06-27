import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import {NbAuthModule} from '@nebular/auth';

import { AuthRoutingModule } from './auth-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {AuthComponent} from './auth.component';
import {RegisterComponent} from './register/register.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        NbAuthModule,
    ],
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
    ],
})
export class AuthModule {

}
