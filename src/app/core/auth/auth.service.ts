import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserModel} from '../models/user.model';
import {AuthModel} from '../models/auth.model';

/**
 * Handles all auth and user related tasks.
 *
 * @author Josh Harkema
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: UserModel;
  public auth: AuthModel;
  public authState: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  /**
   * @param username the user's username.
   * @param password the user's password.
   */
  public login(username: any, password: any): void {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);

    this.http.post(environment.oauthTokenUrl, body.toString(), {
      headers:
        {
          'Authorization': 'Basic ' + btoa('databaseAuthentication:'),
          'grant_type': 'password',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).subscribe((resp: AuthModel) => {
      this.auth = resp;
      this.loadUserDetails();
      localStorage.setItem('auth', JSON.stringify(this.auth));
      this.authState.emit(true);
    }, e => console.log(e));
  }

  public loadUserDetails(): void {
    this.http.get(environment.userDetailsUrl, {
      headers:
        {
          'Authorization': 'Bearer ' + this.auth.access_token,
          'Content-Type': 'application/json'
        }
    }).subscribe((resp: UserModel) => {
      this.user = resp;
      localStorage.setItem('user', JSON.stringify(this.user));
    }, e => console.log(e));
  }

  public logoff(): void {
    this.user = null;
    this.auth = null;
    localStorage.clear();
    this.authState.emit(false);
  }

  public checkToken(): boolean {
    let passed = false;
    if (this.auth == null) {
      this.authState.emit(false);
    } else {
      this.http.get(environment.oauthCheckTokenUrl + '?token=' + this.auth.access_token, {
        headers:
          {
            'Authorization': 'Basic ' + btoa('databaseAuthentication:'),
            'grant_type': 'password',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      }).subscribe(resp => {
        if (resp['active']) {
          this.user.authorities = resp['authorities'];
          this.authState.emit(true);
          passed = true;
        } else {
          this.logoff();
        }
      });
    }
    return passed;
  }

  public isAdmin(): boolean {
    return this.user.authorities.includes('ADMIN');
  }
}
