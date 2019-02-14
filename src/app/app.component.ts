/**
 * Manages root functions for the app.
 *
 * @author Josh Hakema
 */

import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {AuthService} from './core/auth/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {PoemService} from './core/services/poem.service';
import {BookService} from './core/services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'acl';
  private authState;

  constructor(private swUpdate: SwUpdate, private auth: AuthService, private router: Router, private snackBar: MatSnackBar,
              private poemService: PoemService, private bookService: BookService) {
  }

  ngOnInit() {
    // Watch for authstate events and redirect to home.
    this.authState = this.auth.authState.subscribe((event: boolean) => {
      if (!event) {
        this.router.navigate(['/']);
        this.snackBar.open('Logout successful', null, {
          duration: 2000
        });
      }
    });
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

    // Load poem database into poem cache or load cache if found.
    if (localStorage.getItem('poem_cache') !== null) {
      this.poemService.poemCache = JSON.parse(localStorage.getItem('poem_cache'));
    } else {
      this.poemService.updateCache();
    }

    // Load book database into book cache or load cache if found.
    if (localStorage.getItem('book_cache') !== null) {
      this.bookService.bookCache = JSON.parse(localStorage.getItem('book_cache'));
    } else {
      this.bookService.updateCache();
    }
  }
}
