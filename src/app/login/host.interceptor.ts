import {environment} from '../../environments/environment';
import {LoginService} from './login.service';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HostInterceptor implements HttpInterceptor {

  constructor(public auth: LoginService) {
  }

  intercept(original: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request1 = original.clone({
      url: original.url.replace('/api', this.auth.externo ? environment.externo : environment.interno)
    });

    return next.handle(request1).catch(error => {
      console.log(error);
      if (error instanceof HttpErrorResponse) {
        if ((<HttpErrorResponse>error).status === 504 || (<HttpErrorResponse>error).message.includes('unknown url')) {
          this.auth.externo = !this.auth.externo;
          const request2 = original.clone({
            url: original.url.replace('/api', this.auth.externo ? environment.externo : environment.interno)
          });
          return next.handle(request2);
        }
      }
      return Observable.throw(error);
    });
  }
}
