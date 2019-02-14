import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

/**
 * Interactions with /author and /secure/author endpoints are defined here.
 *
 * @author Josh Harkema
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) {
  }

  add(author: any): Observable<any> {
    return this.http.post(environment.apiBaseUrl + 'secure/author/add', author);
  }

  search(author: any): Observable<any> {
    return this.http.put(environment.apiBaseUrl + 'author/search', author);
  }
}
