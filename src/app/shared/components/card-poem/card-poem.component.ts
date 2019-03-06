import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

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

  /**
   * Converts the poem's text from an array into a formatted string.
   * @param input the input array to format.
   * @return a formatted string: newlines are added.
   */
  public formatText(input: string[]): string {
    let result = '';
    for (const s of input) {
      result += s;
      result += '\n';
    }
    return result;
  }
}
