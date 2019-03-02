import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {AdminChangePasswordModel} from '../../../core/models/admin-change-password.model';
import {PasswordValidation} from '../../validators/password-validation';

/**
 * Form for administrators to reset user passwords.
 * @author Josh Harkema
 */
@Component({
  selector: 'app-admin-password-reset-form',
  templateUrl: './admin-password-reset-form.component.html',
  styleUrls: ['./admin-password-reset-form.component.scss']
})
export class AdminPasswordResetFormComponent implements OnInit {
  resetForm: FormGroup;
  @Output() formData: EventEmitter<AdminChangePasswordModel> = new EventEmitter();

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AdminPasswordResetFormComponent>) {
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
      password: ['', [Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      password1: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }
}
