import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (req.url.startsWith('/')) {
      const clonedReq = req.clone({
        url: `${environment.apiUrl}${req.url}`
      });
      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}
