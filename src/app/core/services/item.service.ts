import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

/**
 * Service for dealing with uncategorized items in bulk.
 * @author Josh Harkema
 */
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'item/all');
  }

  getAllUser(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'item/user');
  }
}
