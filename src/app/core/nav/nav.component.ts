import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginFormComponent} from '../../shared/forms/login-form/login-form.component';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private auth: AuthService, private dialog: MatDialog) {
  }

  ngOnInit() {
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
}
