import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { User } from '../../../models/user';
import {RequestFormService} from '../request-form';
import {NbAuthResult, NbAuthSimpleToken, NbTokenService} from '@nebular/auth';
import {BaseService} from '../../../baseclasses/services/base.service';
import {StandardResponse} from "../../../models";

export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    address: string;
    contact_number: number;
    password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  component_name = 'Auth Service';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    getResult: Observable<any>;
    result = new Subject<any>();

    /**
     *
     * @param {NbTokenService} tokenService
     * @param {RequestFormService} dataService
     */
    constructor(
        private tokenService: NbTokenService,
        private dataService: RequestFormService) {
      super();
      this.currentUserSubject = new BehaviorSubject<User>(
          JSON.parse(localStorage.getItem('currentUser')),
      );
      this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    execute(slug, data = {}, redirect): Observable<NbAuthResult> {
        this.dataService
            .execute(
              {
                slug: slug,
                exception: {
                  message: 'Ooopssss. Something went wrong! We will get back to you.',
                  class: 'error',
                  type: 'none',
                },
              },
              data
            )
            .subscribe(
              (result: StandardResponse) => { // Success
                    this.result.next(new NbAuthResult(
                        true,
                        result,
                        redirect,
                        [],
                        result.message,
                    ));
                },
                error => { // Error
                    this.result.next(new NbAuthResult(
                        false,
                        error.error,
                        null,
                        error.error.message,
                    ));
                });
        return this.result.asObservable();
    }

    login(data: LoginData, redirect): Observable<NbAuthResult>  {
        const execute = this.execute('v1.login', data, redirect);
        execute
            .subscribe(
                result => {
                  this.log('Login data', result.getResponse() );
                    const response = result.getResponse();
                    if(result.isSuccess() && response.data){
                      const user = {
                        username: response.data.user.username,
                        id: response.data.user.id,
                        token: response.data.token,
                        user: response.data.user,
                        entity_id: response.data.entity_id,
                        picture: response.data.picture,
                        email: response.data.email,
                        permissions: response.data.permissions,
                      };

                      this.log('Retrieved permissions on log in.', user.permissions );

                      localStorage.setItem('currentUser', JSON.stringify(user));
                      const token = new NbAuthSimpleToken(response.data.token, 'email');
                      this.currentUserSubject.next(response.data);
                      this.tokenService.set(token);
                    }
                });
        return execute;
    }

    register(data: RegisterData, redirect): Observable<NbAuthResult> {
        return this.execute('v1.link.register', data, redirect);
    }

    logout(redirect): Observable<NbAuthResult>  {
      this.log('Destroying user data...', this.currentUserSubject.value);
        const execute = this.execute('v1.auth.logout', {}, redirect);
        execute.subscribe(
                result => {
                    localStorage.removeItem('currentUser');
                    this.currentUserSubject.next(null);
                    this.tokenService.clear();
                });
        return execute;
    }

    validatePermissions(permissions: Array<any>, node = false) {
      this.log('Current user information', this.currentUserValue );
        let user_permission = this.currentUserValue.permissions;
        if (user_permission === undefined) user_permission = [];
        const result = [];
        if (!node) {
            permissions.forEach(function (p_value) {
                result[p_value] = user_permission.indexOf(p_value) !== -1;
            });
            return result;
        }
        permissions.map(p_value => p_value.split('.')).forEach(data => {
            let map = result;
            for (const item of data) {
                let value = map[item];
                if ( data[data.length - 1] === item ) {
                    value = user_permission.indexOf(data.join('.')) !== -1;
                }
                if (value === undefined) {
                    value = {};
                }
                map[item] = value;
                map = map[item];
            }
        });
        return result;
    }
}
