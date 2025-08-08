import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTitle'
})
export class ShortTitlePipe implements PipeTransform {

  transform(value: string, wordLimit: number): string {
    if (!value) return '';
    return value.split(' ').slice(0, wordLimit).join(' ') + '...';
  }

}
