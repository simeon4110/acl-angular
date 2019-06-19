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
  public static BOOK_TYPE = 'BOOK';
  public static POEM_TYPE = 'POEM';
  public static SECTION_TYPE = 'SECT';
  public static SHORT_STORY_TYPE = 'SHST';
  public static PLAY_TYPE = 'PLAY';
  public static PLAY_DIALOG_TYPE = 'DILI';

  constructor(private http: HttpClient) {
  }

  basicSearch(searchString: string): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'basic_search?search_string=' + searchString);
  }

  search(searchForm: FormGroup): Observable<any> {
    const formValue = searchForm.value;
    console.log(formValue);

    const searchParams: SearchParamModel[] = [];
    searchParams.push(new SearchParamModel(formValue.firstFieldName, 'AND', formValue.firstFieldSearchString));
    for (const row of formValue.rows) {
      searchParams.push(
        new SearchParamModel(row.fieldName, row.joinParameter, row.searchString)
      );
    }

    const queryItemTypes: string[] = [];
    // Parse the item types.
    if (formValue.itemTypeAny) {
      queryItemTypes.push(SearchService.POEM_TYPE);
      queryItemTypes.push(SearchService.SECTION_TYPE);
      queryItemTypes.push(SearchService.SHORT_STORY_TYPE);
      queryItemTypes.push(SearchService.PLAY_DIALOG_TYPE);
      queryItemTypes.push(SearchService.PLAY_TYPE);
    } else {
      if (formValue.itemTypePoem) {
        queryItemTypes.push(SearchService.POEM_TYPE);
      }
      if (formValue.itemTypeSection) {
        queryItemTypes.push(SearchService.SECTION_TYPE);
      }
      if (formValue.itemTypeShortStory) {
        queryItemTypes.push(SearchService.SHORT_STORY_TYPE);
      }
      if (formValue.itemTypePlay) {
        queryItemTypes.push(SearchService.PLAY_DIALOG_TYPE);
        queryItemTypes.push(SearchService.PLAY_TYPE);
      }
    }

    console.log(searchParams);
    console.log(queryItemTypes.join(','));
    return this.http.put(environment.apiBaseUrl + 'search?item_types=' + queryItemTypes.join(','), searchParams);
  }
}
