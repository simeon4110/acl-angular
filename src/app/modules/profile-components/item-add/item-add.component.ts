import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ItemAddConfirmationComponent} from './item-add-confirmation/item-add-confirmation.component';
import {NgxSpinnerService} from 'ngx-spinner';

/**
 * This is the form for adding items to the database. The confirmation popup is in item-add-confirmation.
 *
 * @author Josh Harkema
 */
@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent implements OnInit {
  itemDetailsForm: FormGroup;
  authorForm: FormGroup;
  poemForm: FormGroup;

  author: AuthorModel;

  periods = environment.publicationPeriods;
  poemForms = environment.poemForms;

  @ViewChild('stepper') stepper;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private http: HttpClient, private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.createAuthorForm();
    this.createDetailsForm();
    this.createPoemForm();
  }

  /**
   * Submit the poem to the ACL API.
   */
  public submit(): void {
    this.spinner.show();
    const itemFormValue = this.itemDetailsForm.value;
    const poemFormValue = this.poemForm.value;
    const poem = {
      placeOfPublication: itemFormValue.placeOfPublication,
      publisher: itemFormValue.publisher,
      dateOfPublication: itemFormValue.dateOfPublication,
      period: itemFormValue.period,
      url: itemFormValue.url,
      dateOfAccess: itemFormValue.dateOfAccess,
      pageRange: itemFormValue.pageRange,
      isPublicDomain: itemFormValue.isPublicDomain,
      title: poemFormValue.title,
      form: poemFormValue.form,
      text: poemFormValue.text,
      authorId: this.author.id
    };
    this.http.post(environment.apiBaseUrl + 'secure/poem/add', poem).subscribe(() => {
      this.dialog.open(ItemAddConfirmationComponent).componentInstance.reset.subscribe((resp: boolean) => {
        if (resp) {
          this.resetAuthor();
          this.itemDetailsForm.reset();
          this.poemForm.reset();
          this.formDirective.resetForm();
          this.stepper.reset();
          this.spinner.hide();
          this.snackBar.open('The poem has been added successfully.', this.gotoStepperIndex(0), {
            duration: 2000
          });
        } else {
          this.poemForm.reset();
          this.stepper.reset();
          this.spinner.hide();
          this.snackBar.open('The poem has been added successfully', this.gotoStepperIndex(1), {
            duration: 2000
          });
        }
      });
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.snackBar.open(`Something went wrong: ${error}`, this.gotoStepperIndex(0), {
        duration: 2000
      });
    });
  }

  public resetAuthor(): void {
    this.author = null;
    this.authorForm.reset();
  }

  /**
   * Search for an author.
   */
  public searchAuthor(): void {
    this.spinner.show();
    const formModel = this.authorForm.value;
    if (formModel.firstName === null) {
      formModel.firstName = '';
    }
    if (formModel.lastName === null) {
      formModel.lastName = '';
    }
    const authorJson = {
      firstName: formModel.firstName,
      lastName: formModel.lastName
    };
    this.http.put(environment.apiBaseUrl + 'author/search', authorJson)
      .subscribe((resp: AuthorModel[]) => {
        if (resp.length === 1) {
          this.author = resp[0];
          this.spinner.hide();
          this.snackBar.open(`Author ${this.author.firstName} ${this.author.lastName} found, please continue.`,
            this.stepper.next(),
            {
              duration: 2000
            });
        }
      }, error => {
        console.log(error);
        this.spinner.hide();
        this.snackBar.open(`Something went wrong: ${error}`, this.gotoStepperIndex(0), {
          duration: 2000
        });
      });
  }

  /**
   * Sends the stepper to a particular index.
   * @param index the index to jump to (0-2)
   */
  private gotoStepperIndex(index: number): string {
    this.stepper.selectedIndex = index;
    return '';
  }

  private createAuthorForm(): void {
    this.authorForm = this.fb.group({
      firstName: [''],
      lastName: ['', Validators.required]
    });
  }

  private createDetailsForm(): void {
    this.itemDetailsForm = this.fb.group({
      placeOfPublication: ['', Validators.required],
      publisher: ['', Validators.required],
      dateOfPublication: ['', Validators.required],
      shortTitle: [''],
      url: [''],
      dateOfAccess: [''],
      journalName: [''],
      DOI: [''],
      journalVolume: [''],
      journalIssue: [''],
      journalPageRange: [''],
      journalAbbr: [''],
      language: ['English'],
      isPublicDomain: [''],
      period: ['', Validators.required],
      pageRange: ['']
    });
  }

  private createPoemForm(): void {
    this.poemForm = this.fb.group({
      title: [''],
      form: ['', Validators.required],
      text: ['', Validators.required]
    });
  }
}
