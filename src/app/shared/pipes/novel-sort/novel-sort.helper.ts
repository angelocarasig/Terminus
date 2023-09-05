import { VisualNovel } from '../../models/vn/visual-novel';
import { UserNovel } from '../../models/vn/user-novel';

export function sortByPopularity(visualNovelA: VisualNovel, visualNovelB: VisualNovel): number {
  return visualNovelB.popularity - visualNovelA.popularity;
}

export function sortByRecentlyModified(userNovelA: UserNovel, userNovelB: UserNovel): number {
  return userNovelB.lastmod - userNovelA.lastmod;
}

export function sortByVoteScore(userNovelA: UserNovel, userNovelB: UserNovel): number {
  return (userNovelB.vote || 0) - (userNovelA.vote || 0);
}
