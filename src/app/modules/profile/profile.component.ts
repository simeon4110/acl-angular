import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../core/auth/auth.service';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('profileSideNav') public profileSideNav: MatSidenav;

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

  public toggleSideNav(): void {
    this.profileSideNav.toggle();
  }
}
