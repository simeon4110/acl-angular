import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


/**
 * Outputs a username and password as an string[] where [0] = username and [1] = password
 */
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output() credentials: EventEmitter<string[]> = new EventEmitter();

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<LoginFormComponent>) {
  }

  ngOnInit() {
    this.createForm();
  }

  public submit() {
    const formModel = this.loginForm.value;
    this.credentials.emit([formModel.username, formModel.password]);
    this.dialogRef.close();
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
