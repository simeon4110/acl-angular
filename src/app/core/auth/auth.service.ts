import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserModel} from '../models/user.model';
import {AuthModel} from '../models/auth.model';
import {LoadingBarService} from '../services/loading-bar.service';

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
  private _isAuthorized = false;

  constructor(private http: HttpClient, private loadingBar: LoadingBarService) {
  }

  get isAuthorized(): boolean {
    return this._isAuthorized;
  }

  public loadUserDetails(): void {
    this._isAuthorized = true;
    this.http.get(environment.userDetailsUrl).subscribe((resp: UserModel) => {
      this.user = resp;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.authState.emit(true);
      this.loadingBar.setLoading(false);
    }, e => console.log(e));
  }

  /**
   * @param username the user's username.
   * @param password the user's password.
   */
  public login(username: any, password: any): void {
    this.loadingBar.setLoading(true);
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
      localStorage.setItem('auth', JSON.stringify(this.auth));
      this.loadUserDetails();
    }, e => console.log(e));
  }

  public logoff(): void {
    this.user = null;
    this.auth = null;
    localStorage.clear();
    this._isAuthorized = false;
    this.authState.emit(false);
  }

  public isAdmin(): boolean {
    return this.user.privileges.some(e => e.id === 1);
  }

  public checkToken(): boolean {
    this.loadingBar.setLoading(true);
    let passed = false;
    if (this.auth == null) {
      this.authState.emit(false);
      this.loadingBar.setLoading(false);
    } else {
      this.http.get(environment.oauthCheckTokenUrl + '?token=' + this.auth.access_token, {
        headers:
          {
            'Authorization': 'Basic ' + btoa('databaseAuthentication:'),
            'grant_type': 'password'
          }
      }).subscribe(resp => {
        if (resp['active']) {
          passed = true;
          this.loadUserDetails();
        } else {
          this.logoff();
          this.loadingBar.setLoading(false);
        }
      });
    }
    return passed;
  }
}
