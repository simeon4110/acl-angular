import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  @Output() confirmation: EventEmitter<boolean> = new EventEmitter();

  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
  }

  ngOnInit() {
  }

  confirm(): void {
    this.confirmation.emit(true);
    this.dialogRef.close();
  }

  deny(): void {
    this.confirmation.emit(false);
    this.dialogRef.close();
  }
}
