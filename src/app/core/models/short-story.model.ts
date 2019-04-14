import {ItemModel} from './item.model';
import {ConfirmationModel} from './confirmation.model';

interface ShortStoryModel extends ItemModel {
  title: string;
  confirmation: ConfirmationModel;
  text: string;
}
