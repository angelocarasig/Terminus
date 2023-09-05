import { UserNovel } from '../../models/vn/user-novel';
import { LabelType } from '../../models/vn/label';

export function isPlaying(userNovel: UserNovel): boolean {
  return userNovel.labels.some(label => label.label === LabelType.Playing);
}

export function modifiedInLastThirtyDays(novel: UserNovel): boolean {
  return novel.lastmod > Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);
}
