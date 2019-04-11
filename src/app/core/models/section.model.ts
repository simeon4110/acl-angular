import {ItemModel} from './item.model';
import {ConfirmationModel} from './confirmation.model';

export interface SectionModel extends ItemModel {
  title: string;
  confirmation: ConfirmationModel;
  text: string;
  parentId: number;
  parentTitle: string;
}
