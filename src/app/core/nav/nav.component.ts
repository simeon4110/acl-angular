import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginFormComponent} from '../../shared/forms/login-form/login-form.component';
import {AuthService} from '../auth/auth.service';
import {AppComponent} from '../../app.component';
import {LoadingBarService} from '../services/loading-bar.service';

/**
 * The nav bar component. Also handles theme switching.
 *
 * @author Josh Harkema
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  themeClass: string;
  isDark: boolean;
  loading = false;

  constructor(private appComponent: AppComponent, public auth: AuthService, private dialog: MatDialog,
              private loadingBar: LoadingBarService) {
  }

  ngOnInit() {
    this.themeClass = this.appComponent.themeClass;
    this.subscribeToLoadingBar();
    if (localStorage.getItem('theme')) {
      if (localStorage.getItem('theme') === 'dark-theme') {
        this.isDark = true;
        this.setTheme(localStorage.getItem('theme'));
      } else {
        this.themeClass = 'light-theme';
        this.isDark = false;
        this.setTheme(this.themeClass);
      }
    }
  }

  public gotoDocs(): void {
    window.open('https://app.swaggerhub.com/apis-docs/augmented-criticism/ACL/1.0.1', '_blank');
  }

  private subscribeToLoadingBar(): void {
    this.loadingBar.isLoading.subscribe((event: boolean) => this.loading = event);
  }

  private login() {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '250px'
    });
    dialogRef.componentInstance.credentials.subscribe((i: string[]) => {
      this.auth.login(i[0], i[1]);
    });
  }

  public setTheme(newTheme: string): void {
    this.appComponent.swapTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  public toggleTheme(): void {
    if (this.isDark) {
      this.setTheme('light-theme');
      this.isDark = false;
    } else {
      this.setTheme('dark-theme');
      this.isDark = true;
    }
  }
}
