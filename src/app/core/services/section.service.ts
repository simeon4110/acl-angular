import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

/**
 * Service for handling section related API calls.
 * @author Josh Harkema
 */
@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) {
  }

  getById(id: number): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'section/' + id);
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(environment.apiBaseUrl + 'secure/section/' + id);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(environment.apiBaseUrl + 'secure/section/' + id);
  }
}
