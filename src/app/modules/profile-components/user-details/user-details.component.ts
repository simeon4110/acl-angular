import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../core/auth/auth.service';
import {UserService} from '../../../core/services/user.service';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {PasswordResetFormComponent} from '../../../shared/forms/password-reset-form/password-reset-form.component';
import {ChangePasswordModel} from '../../../core/models/change-password.model';
import {ProfileComponent} from '../../profile/profile.component';
import {CustomSnackbarComponent} from '../../../shared/components/custom-snackbar/custom-snackbar.component';
import {LoadingBarService} from '../../../core/services/loading-bar.service';
import {MessageModel} from '../../../core/models/message.model';
import {MessageDialogComponent} from '../../profile/message-dialog/message-dialog.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'userFrom',
    'subject',
    'isRead',
    'actions'
  ];

  constructor(public auth: AuthService, public userService: UserService, private dialog: MatDialog, private snackBar: MatSnackBar,
              public parent: ProfileComponent, private loadingBar: LoadingBarService) {
  }

  ngOnInit() {
    this.getInbox();
  }

  public resetPassword(): void {
    this.loadingBar.setLoading(true);
    this.dialog.open(PasswordResetFormComponent).componentInstance.formData
      .subscribe((formData: ChangePasswordModel) => {
        this.userService.changePassword(formData).subscribe(() => {
          this.loadingBar.setLoading(false);
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              text: 'your password has been reset',
              icon: 'check_circle',
              iconColor: 'primary'
            }
          });
        }, error => {
          this.loadingBar.setLoading(false);
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

  public openMessage(message: MessageModel): void {
    this.userService.readMessage(message.id).subscribe(() => this.getInbox());
    this.dialog.open(MessageDialogComponent, {
      data: {
        item: message
      }
    }).componentInstance.deleteEvent.subscribe((event: boolean) => {
      if (event) {
        this.deleteMessage(message);
      }
    });
  }

  public deleteMessage(message: MessageModel): void {
    this.loadingBar.setLoading(true);
    this.userService.deleteMessage(message.id).subscribe(() => {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: {
          text: 'message deleted',
          icon: 'check_circle',
          iconColor: 'primary'
        }
      });
      this.getInbox();
    });
  }

  private getInbox(): void {
    this.loadingBar.setLoading(true);
    this.userService.getInbox().subscribe((resp: MessageModel[]) => {
      this.dataSource = new MatTableDataSource(resp);
      console.log(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadingBar.setLoading(false);
    });
  }
}
