import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemTableComponent} from '../../../shared/components/item-table/item-table.component';
import {ItemService} from '../../../core/services/item.service';
import {ProfileComponent} from '../../profile/profile.component';
import {LoadingBarService} from '../../../core/services/loading-bar.service';

/**
 * The user item manager panel allows users to modify any unconfirmed items they've added to the database.
 * @author Josh Harkema
 */
@Component({
  selector: 'app-user-item-manager',
  templateUrl: './user-item-manager.component.html',
  styleUrls: ['./user-item-manager.component.scss']
})
export class UserItemManagerComponent implements OnInit {
  @ViewChild(ItemTableComponent) table: ItemTableComponent;

  constructor(private itemService: ItemService, public parent: ProfileComponent, private loadingBar: LoadingBarService) {
  }

  ngOnInit() {
    this.getItems();
    this.table.updateRequired.subscribe(() => this.getItems());
  }

  private getItems(): void {
    this.loadingBar.setLoading(true);
    this.itemService.getAllUser().subscribe((resp: any) => {
      this.table.updateTable(resp);
      this.loadingBar.setLoading(false);
    });
  }
}
