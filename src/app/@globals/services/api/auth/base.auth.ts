import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../../../models/user';
import {AuthenticationService} from "./authentication.service";
import {NbTokenService} from "@nebular/auth";
import {RequestFormService} from "../request-form";
import {BehaviorSubject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class BaseAuth{
  auth: any;
  constructor(
    private authService: AuthenticationService) {
    this.auth = authService;
  }
}
