import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../../../models/user';
import {AuthenticationService} from "./authentication.service";
import {BaseAuth} from "./base.auth";

@Injectable({ providedIn: 'root' })
export class UserService extends BaseAuth {
    getUser(){
      this.auth.currentUserValue;
    }
}
