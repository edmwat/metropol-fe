import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = window.localStorage.getItem("access_token");
    if(token == null){
      return next.handle(request);
    }

    const req = request.clone({
      setHeaders:{      
        Authorization:`Bearer ${window.localStorage.getItem("access_token")}`
      }
    }); 
    //let modreq = 
    return next.handle(req)
  }
}
