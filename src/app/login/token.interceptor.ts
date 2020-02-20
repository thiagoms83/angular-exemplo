import {LoginService} from './login.service';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: LoginService) {
  }

  intercept(original: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (original.url.includes('oauth')) {
      return next.handle(original);
    }
    const request = original.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.token}`
      }
    });
    return next.handle(request).catch(error1 => {
      if (error1 instanceof HttpErrorResponse) {
        if ((<HttpErrorResponse>error1).status === 401) {
          return this.auth.getRefreshToken().switchMap((token: string) => {
            const newRequest = original.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
            return next.handle(newRequest);
          }).catch(error2 => {
            if (error2.status) {
              const status = error2.status;
              if (status === 400 || status === 401) {
                this.auth.logout();
                return Observable.throw('nao foi possivel usar o refresh token!');
              }
            } else {
              return Observable.throw(error2);
            }
          });
        }
      } else {
        return Observable.throw(error1);
      }
    });
  }
}
