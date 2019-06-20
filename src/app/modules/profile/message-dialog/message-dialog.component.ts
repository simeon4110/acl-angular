import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {
  item: any;
  deleteEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.item = data.item;
  }

  ngOnInit() {
  }

  delete(): void {
    this.deleteEvent.emit(true);
  }
}
