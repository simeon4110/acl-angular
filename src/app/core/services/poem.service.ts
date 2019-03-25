import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';
import {ConfirmationDto} from '../models/confirmation.dto';

/**
 * Interactions with /poem and /secure/poem endpoints are defined here.
 *
 * @author Josh Harkema
 */
@Injectable({
  providedIn: 'root'
})
export class PoemService {

  constructor(private http: HttpClient, private auth: AuthService) {
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
    // :todo: fix this so the form fields match the dict fields.
    const poem = {
      sourceTitle: itemFormValue.sourceTitle,
      placeOfPublication: itemFormValue.placeOfPublication,
      publisher: itemFormValue.publisher,
      dateOfPublication: itemFormValue.dateOfPublication,
      period: itemFormValue.period,
      url: itemFormValue.url,
      dateOfAccess: itemFormValue.dateOfAccess,
      pageRange: `${itemFormValue.pageRangeBegin}-${itemFormValue.pageRangeEnd}`,
      publicDomain: itemFormValue.isPublicDomain,
      title: poemFormValue.title,
      form: poemFormValue.form,
      text: poemFormValue.text,
      authorId: author.id
    };

    return this.http.post(environment.apiBaseUrl + 'secure/poem/add', poem);
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(environment.apiBaseUrl + 'secure/poem/delete/' + id);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(environment.apiBaseUrl + 'secure/poem/user_delete/' + id);
  }

  getById(id: number): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'poem/by_id/' + id);
  }

  getByIds(ids: number[]): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'poem/by_ids/' + ids);
  }

  getAll(): Observable<any> {
    if (this.auth.isAuthorized) {
      return this.http.get(environment.apiBaseUrl + 'secure/poem/all');
    }
    return this.http.get(environment.apiBaseUrl + 'poem/all');
  }

  getAllSimple(): Observable<any> {
    if (this.auth.isAuthorized) {
      return this.http.get(environment.apiBaseUrl + 'secure/poem/all_simple');
    }
    return this.http.get(environment.apiBaseUrl + 'poem/all_simple');
  }

  modify(poem: PoemModel): Observable<any> {
    if (this.auth.isAdmin()) {
      return this.http.put(environment.apiBaseUrl + 'secure/poem/modify', poem);
    }
    return this.http.put(environment.apiBaseUrl + 'secure/poem/modify_user', poem);
  }

  getTwoRandomPoems(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'poem/two_random');
  }

  getPoemToConfirm(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'secure/confirmation/get_poem');
  }

  confirmPoem(confirmation: ConfirmationDto): Observable<any> {
    return this.http.put(environment.apiBaseUrl + 'secure/confirmation/confirm_poem', confirmation);
  }

  rejectPoem(confirmation: ConfirmationDto): Observable<any> {
    return this.http.put(environment.apiBaseUrl + 'secure/confirmation/reject_poem', confirmation);
  }
}
