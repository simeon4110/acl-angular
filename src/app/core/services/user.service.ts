import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  allUsers(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'secure/user/all');
  }

  addUser(userForm: FormGroup): Observable<any> {
    const formValue = userForm.value;
    return this.http.post(environment.apiBaseUrl + 'secure/user/add', formValue);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(environment.apiBaseUrl + 'secure/user/delete/' + username);
  }

  modifyUser(username: string, email: string, isAdmin: boolean): Observable<any> {
    return this.http.put(environment.apiBaseUrl + 'secure/user/modify', {
      username: username,
      email: email,
      isAdmin: isAdmin
    });
  }
}