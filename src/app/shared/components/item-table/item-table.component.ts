import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {CardPoemComponent} from '../card-poem/card-poem.component';
import {CardBookComponent} from '../card-book/card-book.component';
import {Overlay} from '@angular/cdk/overlay';
import {CardSectionComponent} from '../card-section/card-section.component';
import {AuthService} from '../../../core/auth/auth.service';
import {PoemService} from '../../../core/services/poem.service';
import {BookService} from '../../../core/services/book.service';
import {SectionService} from '../../../core/services/section.service';
import {Observable} from 'rxjs';
import {ItemDetailsDialogComponent} from '../item-details-dialog/item-details-dialog.component';
import {EditPoemFormComponent} from '../../forms/edit-poem-form/edit-poem-form.component';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

/**
 * General purpose table component for displaying anything that extends the Item model. All item modification,
 * display, and parsing logic is handled here. Subscribe to updateRequired to handle table update events
 * in the parent component.
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

  @Output() updateRequired: EventEmitter<boolean> = new EventEmitter();

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

  constructor(private dialog: MatDialog, private overlay: Overlay, public auth: AuthService, public snackBar: MatSnackBar,
              private poemService: PoemService, private bookService: BookService, private sectionService: SectionService) {
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
   * Returns an observable for an item's full details via the API. Returns null if category does not match known categories.
   * @param type the item's type.
   * @param id the item's database id.
   */
  getItem(type: string, id: number): Observable<any> {
    switch (type) {
      case 'BOOk':
        return this.bookService.getById(id);
      case 'POEM':
        return this.poemService.getById(id);
      case 'SECT':
        return this.sectionService.getById(id);
      default:
        return null;
    }
  }

  /**
   * Routes to the correct dialog display component for a given item type. (i.e. BOOK, POEM, etc.) If
   * the item is received in 'simple' format the item is first retrieved from the API.
   * @param item the item to popup a dialog display for.
   */
  showItem<T extends ItemModel>(item: T): void {
    if (item.simple) { // Catch simple items and retrieve their full details.
      this.getItem(item.category, item.id).subscribe((resp: T) => {
        switch (item.category) {
          case 'POEM':
            this.dialog.open(CardPoemComponent, {
              data: {
                item: resp,
                searchString: this.searchString
              }
            });
            break;
          case 'BOOK':
            this.dialog.open(CardBookComponent, {
              data: {
                item: resp,
                searchString: this.searchString
              },
              scrollStrategy: this.overlay.scrollStrategies.noop()
            });
            break;
          case 'SECT':
            this.dialog.open(CardSectionComponent, {
              data: {
                item: resp,
                searchString: this.searchString
              },
              scrollStrategy: this.overlay.scrollStrategies.noop()
            });
            break;
        }
      });
    } else {
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
  }

  /**
   * Routes to proper service method for item deletion by type.
   * @param type the item's type ('BOOK', 'POEM', etc.)
   * @param id the item's database id.
   */
  deleteItem(type: string, id: number): void {
    // A confirmation dialog is popped up before anything is done.
    this.dialog.open(ConfirmationDialogComponent).componentInstance.confirmation
      .subscribe((resp: boolean) => {
        if (resp) {
          let sub: Observable<any>;
          switch (type) {
            case 'BOOK':
              if (this.auth.isAdmin()) {
                sub = this.bookService.deleteAdmin(id);
              } else {
                sub = this.bookService.deleteUser(id);
              }
              break;
            case 'POEM':
              if (this.auth.isAdmin()) {
                sub = this.poemService.deleteAdmin(id);
              } else {
                sub = this.poemService.deleteUser(id);
              }
              break;
            case 'SECT':
              if (this.auth.isAdmin()) {
                sub = this.sectionService.deleteAdmin(id);
              } else {
                sub = this.sectionService.deleteUser(id);
              }
              break;
          }
          sub.subscribe(() => {
            this.snackBar.open('item deleted', null, {duration: 2000});
            this.updateRequired.emit(true);
          }, error => {
            console.log(error);
            this.snackBar.open('something went wrong', null, {duration: 2000});
            this.updateRequired.emit(true);
          });
        }
      });
  }

  editItem<T extends ItemModel>(item: T): void {
    if (item.simple) {
      this.getItem(item.category, item.id).subscribe((resp: T) => {
        switch (item.category) {
          case 'POEM':
            this.dialog.open(EditPoemFormComponent, {
              data: {poem: resp},
              minWidth: '600px'
            }).componentInstance.poemOut
              .subscribe((formData: any) => console.log(formData));
        }
      });
    }
  }

  /**
   * Display an item's details. If the item is in 'simple' format its details are first retrieved from the API.
   * @param item the item to display the details of.
   */
  itemDetails<T extends ItemModel>(item: T): void {
    if (item.simple) {
      this.getItem(item.category, item.id).subscribe((resp: T) => {
        this.dialog.open(ItemDetailsDialogComponent, {
          data: {
            item: resp
          }
        });
      });
    } else {
      this.dialog.open(ItemDetailsDialogComponent, {
        data: {
          item: item
        }
      });
    }
  }

  /**
   * Rebinds the paginator, sort, and custom sort when table data is updated.
   * @param data an array of objects that extend the ItemModel.
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

  /**
   * Filters the table data.
   * @param filterValue the filter string to apply.
   */
  @Input()
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
