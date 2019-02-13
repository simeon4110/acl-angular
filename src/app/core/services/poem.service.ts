import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {environment} from '../../../environments/environment';

/**
 * Interactions with /poem and /secure/poem endpoints are defined here.
 *
 * @author Josh Harkema
 */
@Injectable({
  providedIn: 'root'
})
export class PoemService {
  constructor(private http: HttpClient) {
  }

  /**
   * Handles request to: /secure/poem/add
   * @param itemForm a valid instance of ItemAddComponent.itemDetailsForm.
   * @param poemForm a valid instance of ItemAddComponent.poemForm.
   * @param author a valid instance of AuthorModel.
   * @return an observable of the POST result.
   */
  add(itemForm: FormGroup, poemForm: FormGroup, author: AuthorModel): Observable<any> {
    const itemFormValue = itemForm.value;
    const poemFormValue = poemForm.value;

    // Parse the form models into a dict.
    const poem = {
      sourceTitle: poemFormValue.sourceTitle,
      placeOfPublication: itemFormValue.placeOfPublication,
      publisher: itemFormValue.publisher,
      dateOfPublication: itemFormValue.dateOfPublication,
      period: itemFormValue.period,
      url: itemFormValue.url,
      dateOfAccess: itemFormValue.dateOfAccess,
      pageRange: itemFormValue.pageRange,
      isPublicDomain: itemFormValue.isPublicDomain,
      title: poemFormValue.title,
      form: poemFormValue.form,
      text: poemFormValue.text,
      authorId: author.id
    };

    return this.http.post(environment.apiBaseUrl + 'secure/poem/add', poem);
  }

  admin_delete(id: number): Observable<any> {
    return this.http.delete(environment.apiBaseUrl + 'secure/poem/delete/' + id);
  }

  getById(id: number): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'poem/by_id/' + id);
  }

  getByIds(ids: number[]): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'poem/by_ids/' + ids);
  }

  getAll(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'poem/all');
  }

  getAllSimple(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'poem/all_simple');
  }
}
