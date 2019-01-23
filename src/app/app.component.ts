/**
 * Manages root functions for the app.
 *
 * @author Josh Hakema
 */

import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {AuthService} from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'acl';

  constructor(private swUpdate: SwUpdate, private auth: AuthService) {
  }

  ngOnInit() {
    // Ensure service worker is up to date.
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load new version?')) {
          window.location.reload();
        }
      });
    }
    // Check for user information in local storage. If found, initialise a verification check on the stored auth_token.
    if (localStorage.getItem('user') !== '' && localStorage.getItem('auth') !== '') {
      this.auth.user = JSON.parse(localStorage.getItem('user'));
      this.auth.auth = JSON.parse(localStorage.getItem('auth'));
      this.auth.checkToken();
    } else {
      this.auth.authState.emit(false);
    }
  }
}
