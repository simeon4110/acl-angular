import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ItemModel} from '../../../core/models/item.model';

/**
 * Shows all the details for a given item in a nice dialog popup table.
 * @author Josh Harkema.
 */
@Component({
  selector: 'app-item-details-dialog',
  templateUrl: './item-details-dialog.component.html',
  styleUrls: ['./item-details-dialog.component.scss']
})
export class ItemDetailsDialogComponent implements OnInit {
  item: ItemModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.item = data.item;
  }

  ngOnInit() {
  }

}
