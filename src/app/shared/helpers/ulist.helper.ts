import { UserNovel } from '../models/user-novel/user-novel';

export function getHighestRatedUserNovels(userNovels: Array<UserNovel>): Array<UserNovel> {
  const filteredArray = userNovels.filter((userNovel) => userNovel.vote !== null);
  const maxVote = Math.max(...filteredArray.map((entry) => entry.vote as number));
  return filteredArray.filter((userNovel) => userNovel.vote === maxVote);
}
