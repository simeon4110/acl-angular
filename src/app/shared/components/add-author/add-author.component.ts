import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorService} from '../../../core/services/author.service';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthorModel} from '../../../core/models/author.model';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent implements OnInit {
  @Output() addedAuthor: EventEmitter<AuthorModel> = new EventEmitter();
  authorForm: FormGroup;

  constructor(private fb: FormBuilder, private authorService: AuthorService, private dialogRef: MatDialogRef<AddAuthorComponent>) {
  }

  ngOnInit() {
    this.createForm();
  }

  addAuthor(): void {
    const formModel = this.authorForm.value;
    const author = {
      'firstName': formModel.firstName,
      'lastName': formModel.lastName
    };
    this.authorService.add(author).subscribe(() => {
      this.authorService.search(author).subscribe((resp: AuthorModel) => {
        this.addedAuthor.emit(resp);
        this.dialogRef.close();
      }, error => console.log(error));
    }, error => console.log(error));
  }

  private createForm(): void {
    this.authorForm = this.fb.group({
      firstName: [''],
      lastName: ['', Validators.required]
    });
  }
}
