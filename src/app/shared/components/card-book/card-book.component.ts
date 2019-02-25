import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {CardSectionComponent} from '../card-section/card-section.component';
import {Overlay} from '@angular/cdk/overlay';

/**
 * Displays a book's contents as a list of chapters / sections.
 *
 * @author Josh Harkema
 */
@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.scss']
})
export class CardBookComponent implements OnInit {
  item: any;
  searchString: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private overlay: Overlay) {
    this.item = data.item;
    this.searchString = data.searchString;
  }

  ngOnInit() {
  }

  /**
   * Pops up a CardSection.
   * @param section the section to display.
   */
  public viewSection(section: SectionModel): void {
    this.dialog.open(CardSectionComponent, {
      data: {
        item: section
      },
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
  }
}
