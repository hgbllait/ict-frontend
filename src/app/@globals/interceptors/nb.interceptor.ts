import { Inject, Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {NB_AUTH_TOKEN_INTERCEPTOR_FILTER, NbAuthService, NbAuthToken} from '@nebular/auth';

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
                                return next.handle(req);
                            }),
                        );
                    } else {
                        return next.handle(req);
                    }
                }),
            );
    }

    protected get authService(): NbAuthService {
        return this.injector.get(NbAuthService);
    }

}
