import { UserNovel } from '../models/user-novel/user-novel';
import { LabelType } from '../models/label/label';
import { MAX_VISIBLE_PROFILE_NOVELS } from '../../../constants';

export function getHighestRatedUserNovels(userNovels: Array<UserNovel>): Array<UserNovel> {
  const filteredArray = userNovels.filter((userNovel) => userNovel.vote !== null);
  const maxVote = Math.max(...filteredArray.map((entry) => entry.vote as number));
  return filteredArray.filter((userNovel) => userNovel.vote === maxVote);
}

export function getPlayingUserNovels(userNovels: Array<UserNovel>): Array<UserNovel> {
  return userNovels.filter(userNovel => userNovel.labels.some(label => label.label === LabelType.Playing)).sort((a, b) => a.added - b.added).reverse();
}

export function getRecentUserNovels(userNovels: Array<UserNovel>): Array<UserNovel> {
  return userNovels.sort((a, b) => a.lastmod - b.lastmod).reverse().slice(0, MAX_VISIBLE_PROFILE_NOVELS);
}

export function getFavouriteUserNovels(userNovels: Array<UserNovel>): Array<UserNovel> {
  return userNovels.filter(userNovel => userNovel.vote != null).sort((a, b) => a.vote! - b!.vote!).reverse().slice(0, MAX_VISIBLE_PROFILE_NOVELS);
}
