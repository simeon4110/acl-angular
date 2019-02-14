import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ItemAddConfirmationComponent} from './item-add-confirmation/item-add-confirmation.component';
import {SelectAuthorComponent} from '../../../shared/components/select-author/select-author.component';
import {AddAuthorComponent} from '../../../shared/components/add-author/add-author.component';
import {AuthorService} from '../../../core/services/author.service';
import {PoemService} from '../../../core/services/poem.service';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
import {BookService} from '../../../core/services/book.service';

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
  itemSelectForm: FormGroup;    // item type (poem, book, etc.)
  itemDetailsForm: FormGroup;   // details all items share.
  authorForm: FormGroup;        // author details.
  poemForm: FormGroup;          // a poem's details.
  sectionForm: FormGroup;       // a sections's details.
  sectionParentForm: FormGroup; // a section's parent book.
  bookForm: FormGroup;          // a book's details.

  selectedType: string;         // all items have types.
  selectedBook: BookModel;      // sections have books.
  author: AuthorModel;          // all items have authors.
  autoComplete: BookModel[];    // for auto-filling the source details form.

  // Pull constants from env.
  periods = environment.publicationPeriods;
  poemForms = environment.poemForms;
  itemTypes = environment.itemTypes;

  // Get bindings to child elements.
  @ViewChild('stepper') stepper;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  // These bind the animated buttons.
  searchBookButton: MatProgressButtonOptions;
  searchAuthorButton: MatProgressButtonOptions;
  itemSubmitButton: MatProgressButtonOptions;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private http: HttpClient, private snackBar: MatSnackBar,
              private authorService: AuthorService, private poemService: PoemService, private bookService: BookService) {
  }

  ngOnInit() {
    this.createItemTypeSelectForm();
    this.createAuthorForm();
    this.createDetailsForm();
    this.createPoemForm();
    this.createSectionForm();
    this.createSectionParentForm();
    this.createBookForm();
  }

  /**
   * Captures change events from the itemSelectForm.
   */
  public selectType(): void {
    this.selectedType = this.itemSelectForm.value.selectedType;
    if (this.selectedType !== 'Chapter / Section') {
      this.stepper.next();
    }
  }

  /**
   * Submit the poem to the ACL API.
   */
  public submitPoem(): void {
    this.poemService.add(this.itemDetailsForm, this.poemForm, this.author).subscribe(() => {
      this.dialog.open(ItemAddConfirmationComponent).componentInstance.reset.subscribe((resp: boolean) => {
        if (resp) {
          this.resetAuthor();
          this.itemSelectForm.reset();
          this.itemDetailsForm.reset();
          this.poemForm.reset();
          this.formDirective.resetForm();
          this.stepper.reset();
          this.snackBar.open('The poem has been added successfully.', this.gotoStepperIndex(0), {
            duration: 2000
          });
        } else {
          this.poemForm.reset();
          this.stepper.reset();
          this.snackBar.open('The poem has been added successfully', this.gotoStepperIndex(3), {
            duration: 2000
          });
        }
      });
    }, error => {
      console.log(error);
      this.snackBar.open(`Something went wrong: ${error.toString()}`, this.gotoStepperIndex(0), {
        duration: 2000
      });
    });
  }

  /**
   * Search for an author, logic defined in the module below. Simply, if one result is found it is assigned to author,
   * if multiple results are found the user is prompted to select one, and if no results are found the user is
   * prompted to add a new author.
   */
  public searchAuthor(): void {
    this.searchAuthorButton.active = true;

    // This deals with the fact that Spring REST doesn't like NULL strings in certain contexts.
    const formModel = this.authorForm.value;
    if (formModel.firstName === null) {
      formModel.firstName = '';
    }
    if (formModel.lastName === null) {
      formModel.lastName = '';
    }

    // Copy the form into a dict object.
    const authorJson = {
      firstName: formModel.firstName,
      lastName: formModel.lastName
    };

    this.authorService.search(authorJson).subscribe((resp: AuthorModel[]) => {
      this.handleAuthorSearchResp(resp);
    });
  }

  public searchBook(): void {
    const formModel = this.sectionParentForm.value;
    this.searchBookButton.active = true;
    this.bookService.search(formModel.title.replace(' ', '_')).subscribe((resp: BookModel[]) => {
      this.searchBookButton.active = false;
      if (resp.length === 1) {
        this.selectedBook = resp[0];
        this.snackBar.open(`${this.selectedBook.title} found, please continue.`, this.stepper.next(), {duration: 2000});
      } else {
        this.snackBar.open('That book does not exist, please enter it into the database.', null, {duration: 2000});
      }
    });
  }

  /**
   * Handles dynamic binding for disabled mat-spinner-buttons.
   * @param form the form to check for validity.
   * @param options the mat-spinner-button options to update.
   */
  public updateSpinnerButton(form: FormGroup, options: MatProgressButtonOptions): void {
    options.disabled = !form.valid;
  }

  /**
   * Sends the stepper to a particular index.
   * @param index the index to jump to (0-2)
   */
  private gotoStepperIndex(index: number): string {
    this.stepper.selectedIndex = index;
    return '';
  }

  public resetAuthor(): void {
    this.author = null;
    this.authorForm.reset();
  }

  public resetBook(): void {
    this.selectedBook = null;
  }

  public updateAutoComplete(): void {
    const formValue = this.itemDetailsForm.value.sourceTitle;
    this.bookService.search(formValue).subscribe((resp: BookModel[]) => {
      this.autoComplete = resp;
    }, error => console.log(error));
  }

  private handleAuthorSearchResp(resp: AuthorModel[]): void {
    // A single result, only result selected as author and form moved to next step.
    if (resp.length === 1) {
      this.author = resp[0];
      this.snackBar.open(`Author ${this.author.firstName} ${this.author.lastName} found, please continue.`)._dismissAfter(2000);
      this.stepper.next();
      this.dialog.closeAll();
    }

    // No result, user is prompted to enter a new user.
    if (resp.length === 0) {
      this.addAuthor();
    }

    // Multiple results, user is prompted to select the correct author.
    if (resp.length >= 2) { // More than one result.
      this.dialog.open(SelectAuthorComponent, {
        data: resp,
        width: '400px'
      }).componentInstance.selectedAuthor.subscribe((author: AuthorModel) => {
        if (author === null) {
          this.addAuthor();
        } else {
          this.author = author;
          this.snackBar.open(`Author ${this.author.firstName} ${this.author.lastName} added, please continue`)._dismissAfter(2000);
          this.stepper.next();
          this.dialog.closeAll();
        }
      });
    }
    this.searchAuthorButton.active = false;
  }

  public autoFillForm(book: any): void {
    const bookValue: BookModel = book.option.value;
    console.log(bookValue);
    this.itemDetailsForm.patchValue({
      sourceTitle: bookValue.title,
      placeOfPublication: bookValue.placeOfPublication,
      publisher: bookValue.publisher,
      dateOfPublication: this.parseDateToForm(bookValue.dateOfPublication),
      period: bookValue.period,
      url: bookValue.url,
      dateOfAccess: this.parseDateToForm(bookValue.dateOfAccess),
      pageRange: bookValue.pageRange
    });
  }

  // Form creation methods:

  private addAuthor(): void {
    this.dialog.open(AddAuthorComponent, {width: '250px'})
      .componentInstance.addedAuthor.subscribe((author: AuthorModel) => {
      this.author = author;
      this.snackBar.open(`Author ${this.author.firstName} ${this.author.lastName} added, please continue`)._dismissAfter(2000);
      this.stepper.next();
      this.dialog.closeAll();
    });
  }

  private createItemTypeSelectForm(): void {
    this.itemSelectForm = this.fb.group({
      selectedType: ['', Validators.required]
    });

    this.itemSubmitButton = {
      active: false,
      text: 'Submit',
      spinnerSize: 19,
      raised: true,
      stroked: false,
      buttonColor: 'accent',
      spinnerColor: 'accent',
      fullWidth: false,
      disabled: true,
      mode: 'indeterminate'
    };
  }

  private createAuthorForm(): void {
    this.authorForm = this.fb.group({
      firstName: [''],
      lastName: ['', Validators.required]
    });

    this.searchAuthorButton = {
      active: false,
      text: 'Search',
      spinnerSize: 19,
      raised: true,
      stroked: false,
      buttonColor: 'accent',
      spinnerColor: 'accent',
      fullWidth: false,
      disabled: true,
      mode: 'indeterminate'
    };
  }

  private createDetailsForm(): void {
    this.itemDetailsForm = this.fb.group({
      placeOfPublication: ['', Validators.required],
      publisher: ['', Validators.required],
      dateOfPublication: ['', Validators.required],
      shortTitle: [''],
      sourceTitle: [''],
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
      text: ['', Validators.required],
      finished: ['', Validators.requiredTrue]
    });
  }

  private createSectionForm(): void {
    this.sectionForm = this.fb.group({
      title: [''],
      text: ['', Validators.required],
      description: [''],
      finished: ['', Validators.required]
    });
  }

  private createSectionParentForm(): void {
    this.sectionParentForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  private createBookForm(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      period: ['', Validators.required],
      type: ['', Validators.required]
    });

    this.searchBookButton = {
      active: false,
      text: 'Search',
      spinnerSize: 19,
      raised: true,
      stroked: false,
      buttonColor: 'accent',
      spinnerColor: 'accent',
      fullWidth: false,
      disabled: true,
      mode: 'indeterminate'
    };
  }

  private parseDateToForm(input: string): string {
    if (input === null) {
      return null;
    }
    const date = new Date(Date.parse(input));
    return date.toISOString().substring(0, 10);
  }
}
