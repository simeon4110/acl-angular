import {ItemModel} from './item.model';
import {SectionModel} from './section.model';

export interface BookModel extends ItemModel {
  type: string;
  sections: SectionModel[];
}
