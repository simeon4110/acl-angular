import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PoemModel} from '../../../core/models/poem.model';

/**
 * Form for editing the title and text of a poem.
 * @author Josh Harkema
 */
@Component({
  selector: 'app-edit-poem-form',
  templateUrl: './edit-poem-form.component.html',
  styleUrls: ['./edit-poem-form.component.scss']
})
export class EditPoemFormComponent implements OnInit {
  @Output() poemOut: EventEmitter<any> = new EventEmitter();

  poem: PoemModel;
  poemText: string;
  poemForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
              private dialogRef: MatDialogRef<EditPoemFormComponent>) {
    this.poem = data.poem;
  }

  ngOnInit() {
    this.formatText();
    this.createPoemForm();
  }

  public submit(): void {
    this.poemOut.emit(this.poemForm.value);
    this.dialogRef.close();
  }

  /**
   * Concat a poem's text into a string and add \n to the end of every line.
   */
  private formatText(): void {
    this.poemText = '';
    for (const s of this.poem.text) {
      this.poemText += s.trim() + '\n';
    }
  }

  private createPoemForm(): void {
    this.poemForm = this.fb.group({
      title: [this.poem.title],
      text: [this.poemText, Validators.required]
    });
  }
}
