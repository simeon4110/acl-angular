import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SearchFormComponent} from '../../shared/forms/search-form/search-form.component';
import {SearchService} from '../../core/services/search.service';
import {CardPoemComponent} from '../../shared/components/card-poem/card-poem.component';
import {CardBookComponent} from '../../shared/components/card-book/card-book.component';
import {Overlay} from '@angular/cdk/overlay';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private fb: FormBuilder, private dialog: MatDialog, private searchService: SearchService,
              private overlay: Overlay) {
  }

  searchEveryWhereForm: FormGroup;
  isLoading = false;

  // The table and its bindings.
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'title', 'author.firstName', 'author.lastName', 'form', 'period'];
  dataSource: MatTableDataSource<any>;

  /**
   * A basic parser that searches an item's text, title, and author first/last name.
   * @param queryString the query string to append to.
   * @param searchString the search string to search for.
   */
  private static parseAnyFieldQuery(queryString: string, searchString: string): string {
    queryString += `(text:"${searchString}~" OR title:"${searchString}~" OR author.firstName:"${searchString}~" ` +
      `OR author.lastName:"${searchString}~") `;
    return queryString;
  }

  ngOnInit() {
    this.createSearchEveryWhereForm();
  }

  /**
   * Pops up the advanced search form and runs a search on the returned value.
   */
  public openAdvancedSearchDialog(): void {
    this.dialog.open(SearchFormComponent).componentInstance.formValue.subscribe((resp: FormGroup) => {
      this.isLoading = true;
      this.doSearch(resp);
    });
  }

  /**
   * Runs the basic search (the non-advanced search.)
   */
  public doSearchEveryWhere(): void {
    this.isLoading = true;
    let searchString = '';
    searchString = SearchComponent.parseAnyFieldQuery(searchString, this.searchEveryWhereForm.value.searchString);
    this.searchService.doBasicSearch(searchString).subscribe((resp: ItemModel[]) => {
      this.dataSource = new MatTableDataSource<ItemModel>(resp);
      this.updateTableBindings();
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }

  /**
   * Runs the advanced search.
   * @param searchForm the value of the searchForm.
   */
  public doSearch(searchForm: FormGroup): void {
    this.searchService.doSearch(searchForm).subscribe((resp: ItemModel[]) => {
      this.dataSource = new MatTableDataSource<ItemModel>(resp);
      this.updateTableBindings();
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
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

  private createSearchEveryWhereForm(): void {
    this.searchEveryWhereForm = this.fb.group({
      searchString: ['']
    });
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
}
