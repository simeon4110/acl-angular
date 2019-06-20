import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
import {CustomSnackbarComponent} from '../../shared/components/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  contactForm: FormGroup;
  btnOpts: MatProgressButtonOptions;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.createContactForm();
    this.btnOpts = {
      active: false,
      text: 'SUBMIT',
      spinnerSize: 21,
      raised: true,
      buttonColor: 'primary',
      spinnerColor: 'accent',
      fullWidth: false,
      disabled: true,
      mode: 'indeterminate'
    };
  }

  public submit(): void {
    this.btnOpts.active = true;
    this.http.post(environment.apiBaseUrl + 'about/send_message', this.contactForm.value)
      .subscribe(() => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            text: 'message sent',
            icon: 'check_circle',
            iconColor: 'primary'
          }
        });
        this.btnOpts.active = false;
      }, error => {
        console.log(error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            text: 'something went wrong',
            icon: 'error',
            iconColor: 'warn'
          }
        });
        this.btnOpts.active = false;
      });
  }

  public updateButtonDisabled(): void {
    this.btnOpts.disabled = !this.contactForm.valid;
  }

  private createContactForm(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      mailingList: ['']
    });
  }
}
