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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'title', 'author', 'form', 'period'];
  dataSource: MatTableDataSource<any>;

  types = [
    'Books',
    'Poems'
  ];

  selectedType = 'Poems';

  poems: PoemModel[];
  books: BookModel[];

  constructor(private fb: FormBuilder, private bookService: BookService, private poemService: PoemService, private dialog: MatDialog,
              private overlay: Overlay) {
  }

  ngOnInit() {
    this.createTypeSelectForm();
    this.getItems();
  }

  public selectType(): void {
    this.selectedType = this.typeSelectForm.value.type;
    this.getItems();
  }

  public getItems(): void {
    if (this.selectedType === 'Poems') {
      this.getPoems();
    } else if (this.selectedType === 'Books') {
      this.getBooks();
    }
  }

  public getBooks(): void {
    this.bookService.getAll().subscribe((resp: BookModel[]) => {
      this.books = resp;
      this.dataSource = new MatTableDataSource<BookModel>(this.books);
      this.updateTableBindings();
    });
  }

  public getPoems(): void {
    this.poemService.getAll().subscribe((resp: PoemModel[]) => {
      this.poems = resp;
      this.dataSource = new MatTableDataSource<PoemModel>(this.poems);
      this.updateTableBindings();
    });
  }

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

  private updateTableBindings(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private createTypeSelectForm(): void {
    this.typeSelectForm = this.fb.group({
      type: ['Poems']
    });
  }
}
