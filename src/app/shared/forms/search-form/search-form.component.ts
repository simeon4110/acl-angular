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
  joinParameters = ['and', 'or', 'not'];
  matchTypes = ['contains', 'is (exact)', 'starts with'];

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

  deleteRow(index): void {
    this.rows.removeAt(index);
  }

  submit(): void {
    this.formValue.emit(this.searchForm);
    this.dialogRef.close();
  }

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
