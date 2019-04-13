import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {SearchFormComponent} from '../../shared/forms/search-form/search-form.component';
import {SearchService} from '../../core/services/search.service';
import {LoadingBarService} from '../../core/services/loading-bar.service';
import {ItemModel} from '../../core/models/item.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchEveryWhereForm: FormGroup;
  searchResults: ItemModel[];
  searchForm: FormGroup;

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
      this.searchService.search(formValue).subscribe((resp: ItemModel[]) => {
        this.searchResults = resp;
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
      .subscribe((resp: ItemModel[]) => {
        this.searchResults = resp;
        this.loadingBar.setLoading(false);
      }, error => {
        console.log(error);
        this.loadingBar.setLoading(false);
      });
  }

  private createSearchEveryWhereForm(): void {
    this.searchEveryWhereForm = this.fb.group({
      searchString: ['']
    });
  }
}
