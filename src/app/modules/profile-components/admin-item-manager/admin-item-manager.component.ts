import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemService} from '../../../core/services/item.service';
import {ItemTableComponent} from '../../../shared/components/item-table/item-table.component';
import {ProfileComponent} from '../../profile/profile.component';

/**
 * The admin item manager panel allows admins to modify any item in the database.
 * @author Josh Harkema
 */
@Component({
  selector: 'app-admin-item-manager',
  templateUrl: './admin-item-manager.component.html',
  styleUrls: ['./admin-item-manager.component.scss']
})
export class AdminItemManagerComponent implements OnInit {
  @ViewChild(ItemTableComponent) table: ItemTableComponent;
  loading = true;

  constructor(private itemService: ItemService, public parent: ProfileComponent) {
  }

  ngOnInit() {
    this.getItems();
    this.table.updateRequired.subscribe(() => this.getItems());
  }

  private getItems(): void {
    this.loading = true;
    this.itemService.getAll().subscribe((resp: ItemModel[]) => {
      this.table.updateTable(resp);
      this.loading = false;
    });
  }
}
