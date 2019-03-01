import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  contactForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.createContactForm();
  }

  public submit(): void {
    this.loading = true;
    this.http.post(environment.apiBaseUrl + 'about/send_message', this.contactForm.value)
      .subscribe(() => {
        this.snackBar.open('message sent', null, {duration: 2000});
        this.loading = false;
      }, error => {
        console.log(error);
        this.snackBar.open('something went wrong', null, {duration: 2000});
        this.loading = false;
      });
  }

  private createContactForm(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      mailingList: ['', Validators.required]
    });
  }
}
