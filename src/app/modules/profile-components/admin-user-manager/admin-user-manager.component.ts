import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {UserModel} from '../../../core/models/user.model';
import {FormGroup} from '@angular/forms';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {UserAddFormComponent} from '../../../shared/forms/user-add-form/user-add-form.component';
import {AdminPasswordResetFormComponent} from '../../../shared/forms/admin-password-reset-form/admin-password-reset-form.component';
import {AdminChangePasswordModel} from '../../../core/models/admin-change-password.model';
import {ConfirmationDialogComponent} from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {ProfileComponent} from '../../profile/profile.component';
import {CustomSnackbarComponent} from '../../../shared/components/custom-snackbar/custom-snackbar.component';
import {LoadingBarService} from '../../../core/services/loading-bar.service';

/**
 * The user manager profile panel.
 * @author Josh Harkema
 */
@Component({
  selector: 'app-admin-user-manager',
  templateUrl: './admin-user-manager.component.html',
  styleUrls: ['./admin-user-manager.component.scss']
})
export class AdminUserManagerComponent implements OnInit {
  users: UserModel[];

  // The table data and bindings.
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<UserModel>;

  displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'authorities',
    'actions'
  ];

  constructor(private userService: UserService, private dialog: MatDialog, private snackBar: MatSnackBar,
              public parent: ProfileComponent, private loadingBar: LoadingBarService) {
  }

  ngOnInit() {
    this.updateTable();
  }

  public addUser(): void {
    this.dialog.open(UserAddFormComponent).componentInstance.formOut.subscribe((resp: FormGroup) => {
      this.loadingBar.setLoading(true);
      this.userService.addUser(resp).subscribe(() => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            text: 'user added successfully',
            icon: 'check_circle',
            iconColor: 'primary'
          }
        });
        this.updateTable();
      }, error => {
        console.log(error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            text: 'something went wrong',
            icon: 'error',
            iconColor: 'warn'
          }
        });
        this.updateTable();
      });
    });
  }

  public deleteUser(username: string): void {
    this.dialog.open(ConfirmationDialogComponent).componentInstance.confirmation
      .subscribe((resp: boolean) => {
        if (resp) {
          this.loadingBar.setLoading(true);
          this.userService.deleteUser(username).subscribe(() => {
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: {
                text: 'user deleted successfully',
                icon: 'check_circle',
                iconColor: 'primary'
              }
            });
            this.updateTable();
          }, error => {
            console.log(error);
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: {
                text: 'something went wrong',
                icon: 'error',
                iconColor: 'warn'
              }
            });
            this.updateTable();
          });
        }
      });
  }

  public resetUserPassword(username: string): void {
    this.dialog.open(AdminPasswordResetFormComponent).componentInstance.formData
      .subscribe((resp: AdminChangePasswordModel) => {
        resp.username = username;
        this.loadingBar.setLoading(true);
        this.userService.adminChangePassword(resp).subscribe(() => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              text: 'password reset successfully',
              icon: 'check_circle',
              iconColor: 'primary'
            }
          });
          this.updateTable();
        }, error => {
          console.log(error);
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              text: 'something went wrong',
              icon: 'error',
              iconColor: 'warn'
            }
          });
          this.updateTable();
        });
      });
  }

  private updateTable(): void {
    this.userService.allUsers().subscribe((resp: UserModel[]) => {
      this.users = resp;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadingBar.setLoading(false);
    }, error => console.log(error));
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
