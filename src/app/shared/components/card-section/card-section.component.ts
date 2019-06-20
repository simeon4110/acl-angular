import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

/**
 * Displays the contents of a section.
 *
 * @author Josh Harkema
 */
@Component({
  selector: 'app-card-section',
  templateUrl: './card-section.component.html',
  styleUrls: ['./card-section.component.scss']
})
export class CardSectionComponent implements OnInit {
  item: any;
  hasPrevious: boolean;
  hasNext: boolean;
  searchString: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.item = data.item;
    this.searchString = data.searchString;
  }

  ngOnInit() {
  }
}
