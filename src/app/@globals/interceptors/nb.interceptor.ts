import { Inject, Injectable, Injector } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {NB_AUTH_TOKEN_INTERCEPTOR_FILTER, NbAuthService, NbAuthToken} from '@nebular/auth';
import {AuthenticationService} from "../services/api";

@Injectable()
export class NbAuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector,
                @Inject(NB_AUTH_TOKEN_INTERCEPTOR_FILTER) protected filter) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.isAuthenticatedOrRefresh()
            .pipe(
                switchMap(authenticated => {
                    if (authenticated) {
                        return this.authService.getToken().pipe(
                            switchMap((token: NbAuthToken) => {
                                const token_value = `Bearer ${token.getValue()}`;
                                req = req.clone({
                                    setHeaders: {
                                        Authorization: token_value,
                                    },
                                });
                                return next.handle(req).catch(err => {
                                  if (err instanceof HttpErrorResponse) {
                                    if (err.status === 401) {
                                      this.authService2.logout('auth/login');
                                    }
                                  }
                                  return Observable.throw(err);
                                });
                            }),

                        )
                    } else {
                        return next.handle(req);
                    }
                }),
            );
    }

    protected get authService(): NbAuthService {
        return this.injector.get(NbAuthService);
    }

    protected get authService2(): AuthenticationService {
      return this.injector.get(AuthenticationService);
    }

}
