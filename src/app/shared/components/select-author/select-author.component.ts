import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

/**
 * Used to select an author when more than one result is returned from a search.
 *
 * @author Josh Harkema
 */
@Component({
  selector: 'app-select-author',
  templateUrl: './select-author.component.html',
  styleUrls: ['./select-author.component.scss']
})
export class SelectAuthorComponent implements OnInit {
  authors: AuthorModel[];
  @Output() selectedAuthor: EventEmitter<AuthorModel> = new EventEmitter();
  displayedColumns: string[] = ['firstName', 'lastName'];

  constructor(private dialogRef: MatDialogRef<SelectAuthorComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.authors = data;
  }

  ngOnInit() {
  }

  selectAuthor(author: AuthorModel): void {
    this.selectedAuthor.emit(author);
    this.dialogRef.close();
  }
}
