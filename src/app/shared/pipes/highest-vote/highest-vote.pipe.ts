import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highestVote'
})
export class HighestVotePipe implements PipeTransform {
  transform(items: Array<any> | null, property: string): Array<any> {
    if (!items || !items.length || !property) return new Array<any>();

    const maxValue = Math.max(...items.map(item => item[property]));

    return items.filter(item => item[property] === maxValue);
  }
}
