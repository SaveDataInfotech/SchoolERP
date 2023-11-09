import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginService } from '../api-service/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private ath: loginService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    debugger;   
    const yy=localStorage.getItem('token')
    debugger;
    if (yy != null) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${yy}` } })
    }
    return next.handle(request);
  }
}
