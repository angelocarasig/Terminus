import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memoize',
  pure: true
})
export class MemoizePipe implements PipeTransform {
  private cache = new Map<string, any>();

  transform(func: (...args: any[]) => any, ...args: any[]): any {
    const key = JSON.stringify(args);
    if (!this.cache.has(key)) {
      this.cache.set(key, func(...args));
    }
    return this.cache.get(key);
  }
}
