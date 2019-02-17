import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';

/**
 * Interactions with /book and /secure/book endpoints are defined here.
 *
 * @author Josh Harkema
 */
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private  auth: AuthService) {
  }

  add(itemForm: FormGroup, bookForm: FormGroup, author: AuthorModel): Observable<any> {
    const itemFormValue = itemForm.value;
    const bookFormValue = bookForm.value;

    const book = {
      authorId: author.id,
      title: bookFormValue.title,
      period: itemFormValue.period,
      type: bookFormValue.type,
      placeOfPublication: itemFormValue.placeOfPublication,
      publisher: itemFormValue.publisher,
      dateOfPublication: itemFormValue.dateOfPublication,
      url: itemFormValue.url,
      dateOfAccess: itemFormValue.dateOfAccess,
      pageRange: `${itemFormValue.pageRangeBegin}-${itemFormValue.pageRangeEnd}`,
      isPublicDomain: itemFormValue.isPublicDomain,
      language: 'English'
    };

    return this.http.post(environment.apiBaseUrl + 'secure/book/add', book);
  }

  getAll(): Observable<any> {
    if (this.auth.isAuthorized) {
      return this.http.get(environment.apiBaseUrl + 'secure/book/all');
    }
    return this.http.get(environment.apiBaseUrl + 'book/all');
  }

  getAllSimple(): Observable<any> {
    if (this.auth.isAuthorized) {
      return this.http.get(environment.apiBaseUrl + 'secure/book/all_simple');
    }
    return this.http.get(environment.apiBaseUrl + 'book/all_simple');
  }

  search(title: String): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'book/get_by_title/' + title);
  }
}
