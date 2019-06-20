import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChangePasswordModel} from '../../../core/models/change-password.model';
import {MatDialogRef} from '@angular/material/dialog';
import {PasswordValidation} from '../../validators/password-validation';

/**
 * Handles the password reset form dialog for users.
 * @author Josh Harkema
 */
@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.scss']
})
export class PasswordResetFormComponent implements OnInit {
  resetForm: FormGroup;
  @Output() formData: EventEmitter<ChangePasswordModel> = new EventEmitter();

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<PasswordResetFormComponent>) {
  }

  ngOnInit() {
    this.createResetForm();
  }

  public submit(): void {
    this.formData.emit(this.resetForm.value);
    this.dialogRef.close();
  }

  private createResetForm(): void {
    this.resetForm = this.fb.group({
      currentPassword: ['', Validators.required],
      password: ['', [Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      password1: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }
}
