import { NovelFilterPipe } from './novel-filter.pipe';

describe('UserNovelFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new NovelFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
