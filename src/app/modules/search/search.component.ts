import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {SearchFormComponent} from '../../shared/forms/search-form/search-form.component';
import {SearchService} from '../../core/services/search.service';
import {ItemTableComponent} from '../../shared/components/item-table/item-table.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild(ItemTableComponent) table: ItemTableComponent;
  searchEveryWhereForm: FormGroup;
  loading = false;
  isEmpty = true;
  searchString = '';

  constructor(private fb: FormBuilder, private dialog: MatDialog, private searchService: SearchService) {
  }

  /**
   * A basic parser that searches an item's text, title, and author first/last name.
   * @param queryString the query string to append to.
   * @param searchString the search string to search for.
   */
  private static parseAnyFieldQuery(queryString: string, searchString: string): string {
    queryString += `(text:"${searchString}"~ OR title:"${searchString}"~ OR author.firstName:"${searchString}"~ ` +
      `OR author.lastName:"${searchString}"~) `;
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
      this.loading = true;
      this.doSearch(resp);
      this.isEmpty = false;
    });
  }

  /**
   * Runs the basic search (the non-advanced search.)
   */
  public doSearchEveryWhere(): void {
    this.loading = true;
    let searchString = '';
    searchString = SearchComponent.parseAnyFieldQuery(searchString, this.searchEveryWhereForm.value.searchString);
    this.searchService.doBasicSearch(searchString).subscribe((resp: ItemModel[]) => {
      this.table.updateTable(resp);
      console.log(resp);
      this.loading = false;
      this.isEmpty = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }

  /**
   * Runs the advanced search and extracts a searchString for item text highlighting if needed.
   * @param searchForm the value of the searchForm.
   */
  public doSearch(searchForm: FormGroup): void {
    this.searchService.doSearch(searchForm).subscribe((resp: ItemModel[]) => {
      // This pulls out a string to highlight in the item cards if it is applicable.
      const formValue = searchForm.value;
      if (formValue.firstFieldName === 'text') {
        this.searchString = formValue.firstFieldSearchString;
      } else {
        for (const f of formValue.rows) {
          if (this.searchString === '' && f.fieldName === 'text') {
            this.searchString = f.searchString;
          }
        }
      }
      this.table.updateTable(resp);
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }

  private createSearchEveryWhereForm(): void {
    this.searchEveryWhereForm = this.fb.group({
      searchString: ['']
    });
  }
}
