import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BookService} from '../../core/services/book.service';
import {PoemService} from '../../core/services/poem.service';
import {ItemTableComponent} from '../../shared/components/item-table/item-table.component';
import {MatSidenav} from '@angular/material';
import {LoadingBarService} from '../../core/services/loading-bar.service';
import {PoemModel} from '../../core/models/poem.model';
import {BookModel} from '../../core/models/book.model';

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
  @ViewChild(ItemTableComponent, {static: true}) table: ItemTableComponent;
  @ViewChild('browseSideNav', {static: true}) sideNav: MatSidenav;

  typeSelectForm: FormGroup;
  types = ['Books', 'Poems'];
  selectedType = 'Poems';

  constructor(private fb: FormBuilder, private bookService: BookService, private poemService: PoemService,
              private loadingBar: LoadingBarService) {
  }

  ngOnInit() {
    this.loadingBar.setLoading(true);
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
    this.loadingBar.setLoading(true);
    if (this.selectedType === 'Poems') {
      this.poemService.getAll().subscribe((resp: PoemModel[]) => {
        this.table.updateTable(resp);
        this.loadingBar.setLoading(false);
      }, error => console.log(error));
    } else if (this.selectedType === 'Books') {
      this.bookService.getAll().subscribe((resp: BookModel[]) => {
        if (resp.length === 0) {
          this.loadingBar.setLoading(false);
        } else {
          this.table.updateTable(resp);
          this.loadingBar.setLoading(false);
        }
      }, error => console.log(error));
    }
  }

  public toggleSideNav(): void {
    this.sideNav.toggle();
  }

  private createTypeSelectForm(): void {
    this.typeSelectForm = this.fb.group({
      type: ['Poems']
    });
  }
}
