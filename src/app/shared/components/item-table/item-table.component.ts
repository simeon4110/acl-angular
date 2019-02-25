import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CardPoemComponent} from '../card-poem/card-poem.component';
import {CardBookComponent} from '../card-book/card-book.component';
import {Overlay} from '@angular/cdk/overlay';
import {CardSectionComponent} from '../card-section/card-section.component';

/**
 * General purpose table component for displaying anything that extends the Item model.
 * @author Josh Harkema
 */
@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss']
})
export class ItemTableComponent implements OnInit {
  @Input() isActions: boolean; // defines if the actions column should be shown.
  @Input() searchString: string; // defines any text that needs to be highlighted.

  // The table data and bindings.
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'id',
    'title',
    'category',
    'author.firstName',
    'author.lastName',
    'type',
    'period'
  ];

  constructor(private dialog: MatDialog, private overlay: Overlay) {
  }

  ngOnInit() {
    // adds the action column if isActions is true.
    if (this.isActions) {
      this.displayedColumns.push('actions');
    }
  }

  getCategoryPretty(category: string): string {
    let out = '';
    switch (category) {
      case 'BOOK':
        out = 'books';
        break;
      case 'POEM':
        out = 'poems';
        break;
      case 'SECT':
        out = 'book sections';
        break;
      case 'SHST':
        out = 'short stories';
        break;
    }
    return out;
  }

  /**
   * Routes to the correct dialog display component for a given item type. (i.e. BOOK, POEM, etc.)
   * @param item the item to popup a dialog display for.
   */
  showItem<T extends ItemModel>(item: T): void {
    switch (item.category) {
      case 'POEM':
        this.dialog.open(CardPoemComponent, {
          data: {
            item: item,
            searchString: this.searchString
          }
        });
        break;
      case 'BOOK':
        this.dialog.open(CardBookComponent, {
          data: {
            item: item,
            searchString: this.searchString
          },
          scrollStrategy: this.overlay.scrollStrategies.noop()
        });
        break;
      case 'SECT':
        this.dialog.open(CardSectionComponent, {
          data: {
            item: item,
            searchString: this.searchString
          },
          scrollStrategy: this.overlay.scrollStrategies.noop()
        });
        break;
    }
  }

  /**
   * Rebinds the paginator, sort, and custom sort when table data is updated.
   */
  @Input()
  updateTable<T extends ItemModel>(data: T[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      console.log(property);
      switch (property) {
        case 'author.firstName':
          return item.author.firstName;
        case 'author.lastName':
          return item.author.lastName;
        default:
          return item[property];
      }
    };
  }
}
