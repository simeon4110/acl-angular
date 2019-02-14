import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

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
  item: SectionModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.item = data;
  }

  ngOnInit() {
  }
}
