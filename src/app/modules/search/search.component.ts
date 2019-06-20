import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SearchFormComponent} from '../../shared/forms/search-form/search-form.component';
import {SearchService} from '../../core/services/search.service';
import {LoadingBarService} from '../../core/services/loading-bar.service';
import {SearchResultModel} from '../../core/models/search-result.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchEveryWhereForm: FormGroup;
  searchForm: FormGroup;

  searchResults: SearchResultModel[];

  // The table data and bindings.
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'category',
    'author',
    'title',
    'context'
  ];

  constructor(private fb: FormBuilder, private dialog: MatDialog, private searchService: SearchService,
              private loadingBar: LoadingBarService) {
  }

  ngOnInit() {
    this.createSearchEveryWhereForm();
  }

  /**
   * Pops up the advanced search form and runs a search on the returned value.
   */
  public openAdvancedSearchDialog(): void {
    this.dialog.open(SearchFormComponent, {
      data: {
        searchForm: this.searchForm
      }
    }).componentInstance.formValue.subscribe((formValue: FormGroup) => {
      this.searchForm = formValue;
      this.loadingBar.setLoading(true);
      this.searchService.search(formValue).subscribe((resp: SearchResultModel[]) => {
        console.log(resp);
        this.searchResults = resp;
        this.updateTable();
        this.loadingBar.setLoading(false);
      });
    });
  }

  /**
   * Runs the basic search (the non-advanced search.)
   */
  public doSearchEveryWhere(): void {
    this.loadingBar.setLoading(true);
    this.searchService.basicSearch(this.searchEveryWhereForm.value.searchString)
      .subscribe((resp: SearchResultModel[]) => {
        this.searchResults = resp;
        this.updateTable();
        this.loadingBar.setLoading(false);
      }, error => {
        console.log(error);
        this.loadingBar.setLoading(false);
      });
  }

  public getContext(text: string): string {
    if (text.trim() === '') {
      return `<p class="mat-body-2"><em>No search hits in text body...</em></p>`;
    }
    text = text.split('\n').join('<br />');
    return '<p class="mat-body-2" style="white-space: pre-wrap">' + text + '</p>';
  }

  private createSearchEveryWhereForm(): void {
    this.searchEveryWhereForm = this.fb.group({
      searchString: ['']
    });
  }

  private updateTable(): void {
    this.dataSource = new MatTableDataSource<any>(this.searchResults);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'category':
          return item.category;
        case 'author':
          return item.lastName;
        case 'title':
          return item.title;
        case 'context':
          return item.text;
        default:
          return item[property];
      }
    };
  }
}
