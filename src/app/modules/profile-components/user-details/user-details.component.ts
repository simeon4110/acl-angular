import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/auth/auth.service';
import {UserService} from '../../../core/services/user.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {PasswordResetFormComponent} from '../../../shared/forms/password-reset-form/password-reset-form.component';
import {ChangePasswordModel} from '../../../core/models/change-password.model';
import {ProfileComponent} from '../../profile/profile.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  loading = false;

  constructor(public auth: AuthService, public userService: UserService, private dialog: MatDialog, private snackBar: MatSnackBar,
              private parent: ProfileComponent) {
  }

  ngOnInit() {
  }

  public resetPassword(): void {
    this.dialog.open(PasswordResetFormComponent).componentInstance.formData
      .subscribe((formData: ChangePasswordModel) => {
        this.userService.changePassword(formData).subscribe(() => {
          this.snackBar.open('your password has been reset', null, {duration: 2000});
        }, error => {
          this.snackBar.open('something went wrong', null, {duration: 2000});
          console.log(error);
        });
      });
  }
}
