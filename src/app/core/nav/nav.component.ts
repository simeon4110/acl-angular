import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginFormComponent} from '../../shared/forms/login-form/login-form.component';
import {AuthService} from '../auth/auth.service';
import {AppComponent} from '../../app.component';

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

  constructor(private appComponent: AppComponent, public auth: AuthService, private dialog: MatDialog) {
  }

  ngOnInit() {
    if (localStorage.getItem('theme') !== '' && localStorage.getItem('theme') !== null) {
      switch (localStorage.getItem('theme')) {
        case 'dark-theme':
          this.themeClass = localStorage.getItem('theme');
          this.isDark = true;
          this.setTheme(this.themeClass);
          break;
        default:
          this.themeClass = 'light-theme';
          this.isDark = false;
          this.setTheme(this.themeClass);
      }
    }
  }

  public gotoDocs(): void {
    window.open('https://app.swaggerhub.com/apis-docs/augmented-criticism/ACL/1.0.0-oas3', '_blank');
  }

  private login() {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '250px'
    });
    dialogRef.componentInstance.credentials.subscribe((i: string[]) => {
      this.auth.login(i[0], i[1]);
      console.log(this.auth.checkToken());
      console.log(this.auth.isAdmin());
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
