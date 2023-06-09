import { UserNovel } from "./shared/models/UserNovel";

export const LOGIN_MODES: Array<string> = ['Basic', 'Auth'];

export const USER_PERMISSIONS: Array<string> = ['listread', 'listwrite'];

export enum VN_RELEASE_STATUS {
  'Unknown',
  'Pending',
  'Obtained',
  'On Loan',
  'Deleted',
}

export const VN_PROPS: Array<string> = [
  'vn.id',
  'vn.title',
  'vn.alttitle',
  'vn.titles.lang',
  'vn.titles.title',
  'vn.titles.latin',
  'vn.titles.official',
  'vn.titles.main',
  'vn.aliases',
  'vn.olang',
  'vn.devstatus',
  'vn.released',
  'vn.languages',
  'vn.platforms',
  'vn.image.id',
  'vn.image.url',
  'vn.image.dims',
  'vn.image.sexual',
  'vn.image.violence',
  'vn.image.votecount',
  'vn.length',
  'vn.length_minutes',
  'vn.length_votes',
  'vn.description',
  'vn.rating',
  'vn.popularity',
  'vn.votecount',
  'vn.screenshots.thumbnail',
  'vn.screenshots.thumbnail_dims',
  'vn.tags.rating',
  'vn.tags.spoiler',
  'vn.tags.lie',
];

export const ULIST_PROPS: Array<string> = [
  // User Novel Stuff
  'id',
  'added',
  'voted',
  'lastmod',
  'vote',
  'started',
  'finished',
  'notes',
  'labels.id',
  'labels.label',

  // Visual Novel Stuff
  ...VN_PROPS,
];

export class NovelStatus {
  static readonly All = 'All';
  static readonly Completed = 'Completed';
  static readonly Playing = 'Playing';
  static readonly OnHold = 'On Hold';
  static readonly Wishlist = 'Wishlist';
}

// Reflective of vndb kana api
export const TabFilterMap = {
  [NovelStatus.Completed]: 2,
  [NovelStatus.Playing]: 1,
  [NovelStatus.OnHold]: 3,
  [NovelStatus.Wishlist]: 5,
};
