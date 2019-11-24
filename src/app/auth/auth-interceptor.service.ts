import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private token: TokenStorageService, public toasterService: ToastrService, public router: Router,
              public authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token !== null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
    }
    console.log(req.urlWithParams);
    return next.handle(authReq).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.error.status === '401' || err.error.status === 401) {
            this.toasterService.error('Session expired', 'Please login again', {positionClass: 'toast-top-center'});
            this.token.signOut();
          } else {
            try {
              this.toasterService.error(err.error.messsage, err.error.title, {positionClass: 'toast-top-center'});
            } catch (e) {
              this.toasterService.error('An error occurred', '', {positionClass: 'toast-top-center'});
            }
          }
          // log error
        }
        return of(err);
      }));
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
];
