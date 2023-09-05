import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'novelSort'
})
export class NovelSortPipe implements PipeTransform {
  transform(array: Array<any> | null, sortFn: (a: any, b: any) => number): Array<any> | null {
    if (!array || !array.length || !sortFn) return array;

    array.sort(sortFn);

    return array;
  }
}
