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
import {OverlayContainer} from '@angular/cdk/overlay';
import {CustomSnackbarComponent} from './shared/components/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'acl';
  private authState;
  public themeClass = 'light-theme';

  constructor(private swUpdate: SwUpdate, private auth: AuthService, private router: Router,
              private snackBar: MatSnackBar, private overlayContainer: OverlayContainer) {
  }

  ngOnInit() {
    this.checkAuthState();
    // Ensure service worker is up to date.
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load new version?')) {
          window.location.reload();
        }
      });
    }
  }

  /**
   * Check if the user has a stored API token. Subscribes to auth events *after* the check.
   */
  private checkAuthState(): void {
    // Check for user information in local storage. If found, initialise a verification check on the stored auth_token.
    if (localStorage.getItem('user') !== '' && localStorage.getItem('auth') !== '') {
      this.auth.user = JSON.parse(localStorage.getItem('user'));
      this.auth.auth = JSON.parse(localStorage.getItem('auth'));
      this.auth.checkToken();
      this.subscribeToAuthEvents();
    } else {
      this.subscribeToAuthEvents();
    }
  }

  /**
   * Handles the snackbar pop-ups for auth events.
   */
  private subscribeToAuthEvents(): void {
    // Watch for authstate events and redirect to home.
    this.authState = this.auth.authState.subscribe((event: boolean) => {
      if (!event) { // logout
        this.router.navigate(['/']);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            text: 'Logout successful',
            icon: 'check_circle',
            iconColor: 'primary'
          }
        });
      } else if (event) { // login
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            text: 'Login successful',
            icon: 'check_circle',
            iconColor: 'primary'
          }
        });
      }
    });
  }

  /**
   * Swaps the overlay container class to the proper theme.
   * @param newTheme the theme to swap to.
   */
  public swapTheme(newTheme: string): void {
    this.themeClass = `${newTheme} mat-app-background`;
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => {
      item.includes('-theme');
    });

    if (themeClassesToRemove.length > 0) {
      console.log(themeClassesToRemove);
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(newTheme);
  }
}
