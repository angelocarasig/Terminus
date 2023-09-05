import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'novelFilter'
})
export class NovelFilterPipe implements PipeTransform {
  transform(items: Array<any> | null, filterFunction: (item: any) => boolean): Array<any> | null {
    if (!items || !filterFunction) {
      return items;
    }

    return items.filter(item => filterFunction(item));
  }
}
