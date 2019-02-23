import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

/**
 * Advanced search form component.
 * @author Josh Harkema
 */
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Output() formValue: EventEmitter<FormGroup> = new EventEmitter();

  searchForm: FormGroup;

  // Define search params.
  joinParameters = ['and', 'or', 'not'];
  matchTypes = ['contains', 'is (exact)', 'starts with'];

  // Define all search fields here, adding / removing fields won't break anything.
  fields = {
    'any': 'any',
    'author.firstName': 'author\'s first name',
    'author.lastName': 'author\'s last name',
    'title': 'book / poem title',
    'chapter_title': 'chapter title (sections)',
    'parent_title': 'book title (sections)',
    'period': 'period',
    'poem_form': 'poetic form',
    'text': 'text'
  };

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<SearchFormComponent>) {
  }

  get rows(): FormArray {
    return this.searchForm.get('rows') as FormArray;
  }

  ngOnInit() {
    this.createSearchForm();
  }

  /**
   * Adds a row to the dynamic search form.
   */
  addRow(): void {
    this.rows.push(
      this.fb.group({
        joinParameter: [this.joinParameters[0], Validators.required],
        fieldName: [this.fields['any'], Validators.required],
        matchType: [this.matchTypes[0], Validators.required],
        searchString: ['', Validators.required]
      })
    );
  }

  /**
   * Removes a row from the search form at a given index.
   * @param index the index of the row to remove.
   */
  deleteRow(index): void {
    this.rows.removeAt(index);
  }

  /**
   * Emits the searchForm and closes the search dialog window.
   */
  submit(): void {
    this.formValue.emit(this.searchForm);
    this.dialogRef.close();
  }

  /**
   * Any can only be checked if no other item types are checked, this is the logic that deals
   * with this requirement.
   * @param setAny true if any is checked, false otherwise.
   */
  updateChecked(setAny: boolean): void {
    if (!setAny) {
      this.searchForm.get('itemTypeAny').patchValue(false);
    } else if (setAny) {
      this.searchForm.get('itemTypeBook').patchValue(false);
      this.searchForm.get('itemTypePoem').patchValue(false);
      this.searchForm.get('itemTypeSection').patchValue(false);
      this.searchForm.get('itemTypeShortStory').patchValue(false);
      this.searchForm.get('itemTypeAny').patchValue(true);
    }
  }

  private createSearchForm(): void {
    this.searchForm = this.fb.group({
      firstFieldName: [this.fields['any'], Validators.required],
      firstFieldMatchType: [this.matchTypes[0], Validators.required],
      firstFieldSearchString: ['', Validators.required],
      itemTypeAny: [true],
      itemTypeBook: [''],
      itemTypePoem: [''],
      itemTypeSection: [''],
      itemTypeShortStory: [''],
      publicationDate: [''],
      rows: this.fb.array([
        this.fb.group({
          joinParameter: [this.joinParameters[0], Validators.required],
          fieldName: [this.fields['any'], Validators.required],
          matchType: [this.matchTypes[0], Validators.required],
          searchString: ['', Validators.required]
        })
      ])
    });
  }
}
