import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-item-add-confirmation',
  templateUrl: './item-add-confirmation.component.html',
  styleUrls: ['./item-add-confirmation.component.scss']
})
export class ItemAddConfirmationComponent implements OnInit {
  @Output() reset: EventEmitter<boolean> = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<ItemAddConfirmationComponent>) {
  }

  ngOnInit() {
  }

  private isReset(): void {
    this.reset.emit(true);
    this.dialogRef.close();
  }

  private isNotReset(): void {
    this.reset.emit(false);
    this.dialogRef.close();
  }
}
