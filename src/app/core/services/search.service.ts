import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FormGroup} from '@angular/forms';

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

  /**
   * Parses a match type into is respective symbol AND adds the closing bracket.
   * @param queryString the queryString to append the match type to.
   * @param matchType the match type to parse.
   */
  private static parseMatchType(queryString: string, matchType: string) {
    switch (matchType) {
      case 'contains':
        queryString += '~) ';
        break;
      case 'is (exact)':
        queryString += ') ';
        break;
      case 'starts with':
        queryString += '*) ';
        break;
    }
    return queryString;
  }

  /**
   * Adds quotes and ~ if the search string contains more than one word. All phrase queries are fuzzy.
   * @param searchString the string to check.
   * @param matchType the type of match.
   */
  private static parsePhraseOrTerm(searchString: string, matchType: string) {
    if (searchString.split(' ').length > 1) {
      return `"${searchString}"~) `;
    }
    return this.parseMatchType(searchString, matchType);
  }

  /**
   * Specific parser for the first row if the form. The form names for subsequent rows do not match the first.
   * @param queryString the query string to append to.
   * @param searchString the search string to search for.
   * @param fieldName the field name to search.
   * @param matchType the match type (i.e. contains, exact, starts with.)
   */
  private static parseFirstRowQuery(queryString: string, searchString: string, fieldName: string, matchType: string) {
    searchString = this.parsePhraseOrTerm(searchString, matchType);
    if (fieldName === 'any') {
      return `(text:${searchString} OR (title:${searchString} OR (author.firstName:${searchString} ` +
        `OR (author.lastName:${searchString} `;
    } else {
      return `(${fieldName}:${searchString} `;
    }
  }

  /**
   * General purpose parser for rows that are not the first row. This parser is used for specific fields, to search any field use
   * parseAnyFieldQuery.
   * @param queryString the query string to append to.
   * @param searchString the search string to search for.
   * @param fieldName the field name to search.
   * @param matchType the match type (i.e. contains, exact, starts with.)
   * @param joinParameter i.e. AND, OR, NOT
   */
  private static parseKnownFieldQuery(queryString: string, searchString: string, fieldName: string, matchType: string,
                                      joinParameter: string): string {
    switch (joinParameter) {
      case 'and':
        queryString += 'AND ';
        break;
      case 'or':
        queryString += 'OR ';
        break;
      case 'not':
        queryString += 'NOT ';
    }

    searchString = this.parsePhraseOrTerm(searchString, matchType);
    queryString += `(${fieldName}:${searchString}`;
    return queryString;
  }

  public doBasicSearch(searchString: string): Observable<any> {
    const params = new HttpParams().set('query_string', searchString);
    return this.http.get(environment.apiBaseUrl + 'search', {params: params});
  }

  /**
   * Automatic parser for the SearchFormComponent.
   * @param searchForm a valid search form from the Search Component.
   */
  public doSearch(searchForm: FormGroup): Observable<any> {
    const formValue = searchForm.value;
    let queryString = '';
    const queryItemTypes = [];

    // Parse the item types.
    if (formValue.itemTypeAny) {
      queryItemTypes.push('book');
      queryItemTypes.push('poem');
      queryItemTypes.push('section');
      queryItemTypes.push('short story');
    } else {
      if (formValue.itemTypeBook) {
        queryItemTypes.push('book');
      }
      if (formValue.itemTypePoem) {
        queryItemTypes.push('poem');
      }
      if (formValue.itemTypeSection) {
        queryItemTypes.push('section');
      }
      if (formValue.itemTypeShortStory) {
        queryItemTypes.push('short story');
      }
    }

    // Parse the first row of the form.
    queryString = SearchService.parseFirstRowQuery(queryString, formValue.firstFieldSearchString, formValue.firstFieldName,
      formValue.firstFieldMatchType);

    // Parse the remaining rows.
    if (formValue.rows.length > 0) {
      for (const f of formValue.rows) {
        queryString = SearchService.parseKnownFieldQuery(queryString, f.searchString, f.fieldName,
          f.matchType, f.joinParameter);
      }
    }
    let params = new HttpParams().set('query_string', queryString);
    params = params.append('item_types', `${queryItemTypes.join(',')}`);
    return this.http.get(environment.apiBaseUrl + 'search', {params: params});
  }
}
