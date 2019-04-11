import {ItemModel} from './item.model';
import {ConfirmationModel} from './confirmation.model';
import {AnnotationModel} from './annotation.model';

export interface PoemModel extends ItemModel {
  form: string;
  confirmation: ConfirmationModel;
  text: any;
  annotation: AnnotationModel;
  hidden: boolean;
  testing: boolean;
  authorId: number;
}
