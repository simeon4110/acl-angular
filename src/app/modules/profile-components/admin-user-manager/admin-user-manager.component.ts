import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {UserModel} from '../../../core/models/user.model';
import {FormGroup} from '@angular/forms';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {UserAddFormComponent} from '../../../shared/forms/user-add-form/user-add-form.component';
import {AdminPasswordResetFormComponent} from '../../../shared/forms/admin-password-reset-form/admin-password-reset-form.component';
import {AdminChangePasswordModel} from '../../../core/models/admin-change-password.model';

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
  loading = true;

  // The table data and bindings.
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<UserModel>;

  displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'authorities',
    'actions'
  ];

  constructor(private userService: UserService, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.updateTable();
  }

  public addUser(): void {
    this.dialog.open(UserAddFormComponent).componentInstance.formOut.subscribe((resp: FormGroup) => {
      this.loading = true;
      this.userService.addUser(resp).subscribe(() => {
        this.snackBar.open('user added successfully', null, {duration: 2000});
        this.updateTable();
      }, error => {
        console.log(error);
        this.snackBar.open('something went wrong', null, {duration: 2000});
        this.updateTable();
      });
    });
  }

  public deleteUser(username: string): void {
    this.loading = true;
    this.userService.deleteUser(username).subscribe(() => {
      this.snackBar.open('user deleted successfully', null, {duration: 2000});
      this.updateTable();
    }, error => {
      console.log(error);
      this.snackBar.open('something went wrong', null, {duration: 2000});
      this.updateTable();
    });
  }

  public resetUserPassword(username: string): void {
    this.dialog.open(AdminPasswordResetFormComponent).componentInstance.formData
      .subscribe((resp: AdminChangePasswordModel) => {
        resp.username = username;
        this.loading = true;
        this.userService.adminChangePassword(resp).subscribe(() => {
          this.snackBar.open('password reset successfully', null, {duration: 2000});
          this.updateTable();
        }, error => {
          console.log(error);
          this.snackBar.open('something went wrong', null, {duration: 2000});
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
      this.loading = false;
    }, error => console.log(error));
  }
}
