import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

/**
 * Displays a poem's text and details.
 * @author Josh Harkema
 */
@Component({
  selector: 'app-card-poem',
  templateUrl: './card-poem.component.html',
  styleUrls: ['./card-poem.component.scss']
})
export class CardPoemComponent implements OnInit {
  item: any;
  searchString: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.item = data.item;
    this.searchString = data.searchString;
  }

  ngOnInit() {
  }
}
