import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../core/auth/auth.service';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('profileSideNav', {static: true}) public profileSideNav: MatSidenav;

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

  public toggleSideNav(): void {
    this.profileSideNav.toggle();
  }
}
