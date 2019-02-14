import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BookService} from '../../core/services/book.service';
import {PoemService} from '../../core/services/poem.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CardPoemComponent} from '../../shared/components/card-poem/card-poem.component';
import {CardBookComponent} from '../../shared/components/card-book/card-book.component';
import {Overlay} from '@angular/cdk/overlay';

/**
 * The browse module.
 *
 * @author Josh Harkema
 */
@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  typeSelectForm: FormGroup;

  // The table and its bindings.
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'title', 'author.firstName', 'author.lastName', 'form', 'period'];
  dataSource: MatTableDataSource<any>;

  types = ['Books', 'Poems'];
  selectedType = 'Poems';

  constructor(private fb: FormBuilder, private bookService: BookService, private poemService: PoemService, private dialog: MatDialog,
              private overlay: Overlay) {
  }

  ngOnInit() {
    this.createTypeSelectForm();
    this.getItems();
  }

  /**
   * Triggered when user changes the item type option.
   */
  public selectType(): void {
    this.selectedType = this.typeSelectForm.value.type;
    this.getItems();
  }

  /**
   * Swaps out the table's dataSource and triggers a binding update.
   */
  public getItems(): void {
    if (this.selectedType === 'Poems') {
      this.dataSource = new MatTableDataSource<PoemModel>(this.poemService.poemCache);
      this.updateTableBindings();
    } else if (this.selectedType === 'Books') {
      this.dataSource = new MatTableDataSource<BookModel>(this.bookService.bookCache);
      this.updateTableBindings();
    }
  }

  /**
   * Routes to the correct dialog display component for a given item type. (i.e. BOOK, POEM, etc.)
   * @param item the item to popup a dialog display for.
   */
  public showItem<T extends ItemModel>(item: T): void {
    if (item.category === 'POEM') {
      console.log(item);
      this.dialog.open(CardPoemComponent, {
        data: item
      });
    } else if (item.category === 'BOOK') {
      console.log(item);
      this.dialog.open(CardBookComponent, {
        scrollStrategy: this.overlay.scrollStrategies.noop(),
        data: item
      });
    }
  }

  /**
   * Rebinds the paginator, sort, and custom sort to the table DataSource.
   */
  private updateTableBindings(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
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

  private createTypeSelectForm(): void {
    this.typeSelectForm = this.fb.group({
      type: ['Poems']
    });
  }
}
