import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  public doSearch(searchString: string): Observable<any> {
    const params = new HttpParams().set('query_string', searchString);
    return this.http.get(environment.apiBaseUrl + 'search', {params: params});
  }
}
