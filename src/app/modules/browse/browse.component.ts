import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BookService} from '../../core/services/book.service';
import {PoemService} from '../../core/services/poem.service';
import {ItemTableComponent} from '../../shared/components/item-table/item-table.component';

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
  @ViewChild(ItemTableComponent) table: ItemTableComponent;

  typeSelectForm: FormGroup;
  types = ['Books', 'Poems'];
  selectedType = 'Poems';

  loading = true; // Always loads with no data.

  constructor(private fb: FormBuilder, private bookService: BookService, private poemService: PoemService) {
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
    this.loading = true;
    if (this.selectedType === 'Poems') {
      this.poemService.getAll().subscribe((resp: PoemModel[]) => {
        this.table.updateTable(resp);
        this.loading = false;
      });
    } else if (this.selectedType === 'Books') {
      this.bookService.getAll().subscribe((resp: BookModel[]) => {
        this.table.updateTable(resp);
        this.loading = false;
      });
    }
  }

  private createTypeSelectForm(): void {
    this.typeSelectForm = this.fb.group({
      type: ['Poems']
    });
  }
}
