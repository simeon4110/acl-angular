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
import {BookService} from '../../../core/services/book.service';
import {ShortStoryService} from '../../../core/services/short-story.service';
import {ProfileComponent} from '../../profile/profile.component';

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
  shortStoryForm: FormGroup;    // a short story's details.

  selectedType: string;         // all items have types.
  selectedBook: BookModel;      // sections have books.
  author: AuthorModel;          // all items have authors.
  autoComplete: BookModel[];    // for auto-filling the source details form.

  // Pull constants from env.
  periods = environment.publicationPeriods;
  poemForms = environment.poemForms;
  itemTypes = environment.itemTypes;
  bookTypes = environment.bookTypes;

  // Get bindings to child elements.
  @ViewChild('stepper') stepper;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private http: HttpClient, private snackBar: MatSnackBar,
              private authorService: AuthorService, private poemService: PoemService, private bookService: BookService,
              private shortStoryService: ShortStoryService, private parent: ProfileComponent) {
  }

  ngOnInit() {
    this.createItemTypeSelectForm();
    this.createAuthorForm();
    this.createDetailsForm();
    this.createPoemForm();
    this.createSectionForm();
    this.createSectionParentForm();
    this.createBookForm();
    this.createShortStoryForm();
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
          this.poemForm.reset();
          this.resetAllForms();
          this.gotoStepperIndex(0);
        } else {
          this.poemForm.reset();
          this.gotoStepperIndex(3);
        }
      });
    }, error => {
      console.log(error);
      this.snackBar.open(`Something went wrong: ${error.message}`, this.gotoStepperIndex(0), {
        duration: 2000
      });
    });
  }

  public submitBook(): void {
    this.bookService.add(this.itemDetailsForm, this.bookForm, this.author).subscribe(() => {
      this.dialog.open(ItemAddConfirmationComponent).componentInstance.reset.subscribe((resp: boolean) => {
        if (resp) {
          this.bookForm.reset();
          this.resetAllForms();
          this.gotoStepperIndex(0);
        } else {
          this.bookForm.reset();
          this.gotoStepperIndex(3);
        }
      });
    }, error => {
      console.log(error);
      this.snackBar.open(`Something went wrong: ${error.message}`, this.gotoStepperIndex(0), {
        duration: 2000
      });
    });
  }

  public submitShortStory(): void {
    this.shortStoryService.add(this.itemDetailsForm, this.shortStoryForm, this.author).subscribe(() => {
      this.dialog.open(ItemAddConfirmationComponent).componentInstance.reset.subscribe((resp: boolean) => {
        if (resp) {
          this.shortStoryForm.reset();
          this.resetAllForms();
          this.gotoStepperIndex(0);
        } else {
          this.shortStoryForm.reset();
          this.gotoStepperIndex(3);
        }
      }, error => {
        console.log(error);
        this.snackBar.open(`Something went wrong: ${error.message}`, this.gotoStepperIndex(0), {
          duration: 2000
        });
      });
    });
  }

  /**
   * Search for an author, logic defined in the module below. Simply, if one result is found it is assigned to author,
   * if multiple results are found the user is prompted to select one, and if no results are found the user is
   * prompted to add a new author.
   */
  public searchAuthor(): void {
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
    this.bookService.search(formModel.title.replace(' ', '_')).subscribe((resp: BookModel[]) => {
      if (resp.length === 1) {
        this.selectedBook = resp[0];
        this.snackBar.open(`${this.selectedBook.title} found, please continue.`, this.stepper.next(), {duration: 2000});
      } else {
        this.snackBar.open('That book does not exist, please enter it into the database.', null, {duration: 2000});
      }
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
      journalName: bookValue.journalName,
      journalVolume: bookValue.journalVolume,
      journalIssue: bookValue.journalIssue,
      pageNumberStart: bookValue.pageRange.split('-')[0],
      pageNumberEnd: bookValue.pageRange.split('-')[1]
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
      edition: [''],
      pageRangeBegin: [''],
      pageRangeEnd: ['']
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
      type: ['', Validators.required],
      finished: ['', Validators.required]
    });
  }

  private createShortStoryForm(): void {
    this.shortStoryForm = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      finished: ['', Validators.required]
    });
  }

  // Helper methods:

  private parseDateToForm(input: string): string {
    if (input === null) {
      return null;
    }
    const date = new Date(Date.parse(input));
    return date.toISOString().substring(0, 10);
  }

  private handleAuthorSearchResp(resp: AuthorModel[]): void {
    // A single result, only result selected as author and form moved to next step.
    if (resp.length === 1) {
      this.author = resp[0];
      this.stepper.next();
      this.snackBar.open(`Author ${this.author.firstName} ${this.author.lastName} found, please continue.`)._dismissAfter(2000);
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
          this.dialog.closeAll();
        }
      });
    }
  }

  private resetAllForms(): void {
    this.resetAuthor();
    this.itemSelectForm.reset();
    this.itemDetailsForm.reset();
    this.formDirective.resetForm();
    this.stepper.reset();
  }
}
