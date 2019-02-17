import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShortStoryService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  add(itemForm: FormGroup, shortStoryForm: FormGroup, author: AuthorModel): Observable<any> {
    const itemFormValue = itemForm.value;
    const shortStoryFormValue = shortStoryForm.value;

    const shortStory = {
      authorId: author.id,
      title: shortStoryFormValue.title,
      text: shortStoryFormValue.text,
      period: itemFormValue.period,
      publisher: itemFormValue.publisher,
      dateOfPublication: itemFormValue.dateOfPublication,
      placeOfPublication: itemFormValue.placeOfPublication,
      sourceTitle: itemFormValue.sourceTitle,
      journalName: itemFormValue.journalName,
      journalVolume: itemFormValue.journalVolume,
      journalIssue: itemFormValue.journalIssue,
      pageRange: `${itemFormValue.pageRangeBegin}-${itemFormValue.pageRangeEnd}`,
      url: itemFormValue.url,
      dateOfAccess: itemFormValue.dateOfAccess,
      isPublicDomain: itemFormValue.isPublicDomain,
      language: 'English'
    };
    console.log(shortStory);
    return this.http.post(environment.apiBaseUrl + 'secure/short_story/add', shortStory);
  }

  getAll(): Observable<any> {
    if (this.auth.isAuthorized) {
      return this.http.get(environment.apiBaseUrl + 'secure/short_story/all');
    }
    return this.http.get(environment.apiBaseUrl + 'short_story/all');
  }
}
