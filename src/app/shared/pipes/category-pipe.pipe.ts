import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'categoryPipe'
})
export class CategoryPipePipe implements PipeTransform {

  transform(value: any, args?: any): string {
    switch (value) {
      case 'POEM':
        return 'Poem';
      case 'SECT':
        return 'Chapter';
      case 'SHST':
        return 'Short Story';
      default:
        return 'Unknown';
    }
  }
}
