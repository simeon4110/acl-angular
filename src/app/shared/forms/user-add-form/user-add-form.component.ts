import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-user-add-form',
  templateUrl: './user-add-form.component.html',
  styleUrls: ['./user-add-form.component.scss']
})
export class UserAddFormComponent implements OnInit {
  userAddForm: FormGroup;
  @Output() formOut: EventEmitter<FormGroup> = new EventEmitter();

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<UserAddFormComponent>) {
  }

  ngOnInit() {
    this.createUserAddForm();
  }

  submit(): void {
    this.formOut.emit(this.userAddForm);
    this.dialogRef.close();
  }

  private createUserAddForm(): void {
    this.userAddForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      requiredSonnets: ['', Validators.required],
      isAdmin: [false, Validators.required]
    });
  }
}
