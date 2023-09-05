import { UserNovel } from '../models/vn/user-novel';
import { LabelType } from '../models/vn/label';

/**
 * About
 * This helper section are for all general functions to be used in other components usernovel/visualnovel related
 */

export function getHighestRatedUserNovels(userNovels: Array<UserNovel>): Array<UserNovel> {
  const filteredArray = userNovels.filter((userNovel) => userNovel.vote !== null);
  const maxVote = Math.max(...filteredArray.map((entry) => entry.vote as number));
  return filteredArray.filter((userNovel) => userNovel.vote === maxVote);
}

export function getPlayingUserNovels(userNovels: Array<UserNovel>): Array<UserNovel> {
  return userNovels.filter(userNovel => userNovel.labels.some(label => label.label === LabelType.Playing)).sort((a, b) => b.added - a.added);
}

export function getRecentUserNovels(userNovels: Array<UserNovel>): Array<UserNovel> {
  const thirtyDaysAgo = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);

  return userNovels
    .filter(userNovel => userNovel.lastmod > thirtyDaysAgo)
    .sort((a, b) => b.lastmod - a.lastmod);
}

export function getFavouriteUserNovels(userNovels: Array<UserNovel>): Array<UserNovel> {
  return userNovels.filter(userNovel => userNovel.vote != null).sort((a, b) => b.vote! - a!.vote!);
}
