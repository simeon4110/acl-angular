import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'formatPoemFromArray'})
export class PoemArrayFormatPipe implements PipeTransform {
  transform(value: string[], ...args): string {
    let result = '';
    for (const s of value) {
      result += s.trim() + '\n';
    }
    return result;
  }
}

