import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FormGroup} from '@angular/forms';
import {SearchParamModel} from '../models/search-param.model';

/**
 * Handles connections to the search endpoint.
 *
 * @author Josh Harkema
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  basicSearch(searchString: string): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'basic_search?search_string=' + searchString);
  }

  search(formValue: FormGroup): Observable<any> {
    const searchParams: SearchParamModel[] = [];
    return null;
  }
}
