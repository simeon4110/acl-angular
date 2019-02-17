import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  itemTypes = ['any', 'poems', 'novels', 'short stories'];

  fields = {
    'any': 'any',
    'author.firstName': 'author\'s first name',
    'author.lastName': 'author\'s last name',
    'title': 'title',
    'period': 'period',
    'poem_form': 'poetic form',
    'text': 'text'
  };

  constructor(private fb: FormBuilder) {
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
    // this.dialogRef.close();
  }

  private createSearchForm(): void {
    this.searchForm = this.fb.group({
      firstFieldName: [this.fields['any'], Validators.required],
      firstFieldMatchType: [this.matchTypes[0], Validators.required],
      firstFieldSearchString: ['', Validators.required],
      itemType: [this.itemTypes[0], Validators.required],
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
