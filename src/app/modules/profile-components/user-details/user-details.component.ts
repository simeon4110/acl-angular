import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/auth/auth.service';
import {UserService} from '../../../core/services/user.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {PasswordResetFormComponent} from '../../../shared/forms/password-reset-form/password-reset-form.component';
import {ChangePasswordModel} from '../../../core/models/change-password.model';
import {ProfileComponent} from '../../profile/profile.component';
import {CustomSnackbarComponent} from '../../../shared/components/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  loading = false;

  constructor(public auth: AuthService, public userService: UserService, private dialog: MatDialog, private snackBar: MatSnackBar,
              public parent: ProfileComponent) {
  }

  ngOnInit() {
  }

  public resetPassword(): void {
    this.dialog.open(PasswordResetFormComponent).componentInstance.formData
      .subscribe((formData: ChangePasswordModel) => {
        this.userService.changePassword(formData).subscribe(() => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              text: 'your password has been reset',
              icon: 'check_circle',
              iconColor: 'primary'
            }
          });
        }, error => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              text: 'something went wrong',
              icon: 'error',
              iconColor: 'warn'
            }
          });
          console.log(error);
        });
      });
  }
}
