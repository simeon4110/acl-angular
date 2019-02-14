import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';

/**
 * Appends every authorized request with OAuth authorization headers.
 *
 * @author Josh Harkema
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Prevent the check_token endpoint from having headers modified.
    if (this.auth.isAuthorized && req.url.search(/token=/) === -1) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.auth.auth.access_token}`
        }
      });
    }
    return next.handle(req);
  }
}
