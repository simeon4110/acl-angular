import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public static searchFields = {
    'author first name': 'author.firstName',
    'author last name': 'author.lastName',
    'year of initial publication': 'publicationYear',
    'title': 'title',
    'period of initial publication': 'period',
    'poetic form': 'poem_form',
    'text': 'text',
    'item type': 'category',
    'title of source text': 'source_title',
  };

  constructor(private http: HttpClient) {
  }

  public doSearch(searchString: string): Observable<any> {
    const params = new HttpParams().set('search_string', searchString);
    return this.http.get(environment.apiBaseUrl + 'search', {params: params});
  }
}
