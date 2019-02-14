import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {interval, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

/**
 * Interactions with /book and /secure/book endpoints are defined here.
 *
 * @author Josh Harkema
 */
@Injectable({
  providedIn: 'root'
})
export class BookService {
  public updateComplete: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) {
    interval(5000 * 60).subscribe(() => this.updateCache());
  }

  private _bookCache: BookModel[];

  add(itemForm: FormGroup, bookForm: FormGroup, author: AuthorModel): Observable<any> {
    const itemFormValue = itemForm.value;
    const bookFormValue = bookForm.value;

    const book = {
      authorId: author.id,
      title: bookFormValue.title,
      period: bookFormValue.period,
      type: bookFormValue.type,
      placeOfPublication: itemFormValue.placeOfPublication,
      publisher: itemFormValue.publisher,
      dateOfPublication: itemFormValue.dateOfPublication,
      url: itemFormValue.url,
      dateOfAccess: itemFormValue.dateOfAccess,
      pageRange: itemFormValue.pageRange,
      isPublicDomain: itemFormValue.isPublicDomain
    };

    return this.http.post(environment.apiBaseUrl + 'secure/book/add', book);
  }

  get bookCache(): BookModel[] {
    return this._bookCache;
  }

  getAll(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'book/all');
  }

  getAllSimple(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'book/all_simple');
  }

  search(title: String): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'book/get_by_title/' + title);
  }

  set bookCache(value: BookModel[]) {
    this._bookCache = value;
  }

  updateCache(): void {
    this.getAll().subscribe((resp: BookModel[]) => {
      this._bookCache = resp;
      localStorage.setItem('book_cache', JSON.stringify(this._bookCache));
      this.updateComplete.emit(true);
    });
  }
}
