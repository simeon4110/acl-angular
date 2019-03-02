import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material';
import {MatProgressButtonOptions} from 'mat-progress-buttons';

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
        this.snackBar.open('message sent', null, {duration: 2000});
        this.btnOpts.active = false;
      }, error => {
        console.log(error);
        this.snackBar.open('something went wrong', null, {duration: 2000});
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
