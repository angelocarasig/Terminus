export const LOCAL_STORAGE_KEYS = {
  currentUser: 'currentUser',
  theme: 'theme',
}

export class REPOSITORY {
  public static readonly URL = 'https://github.com/angelocarasig/Terminus';
  public static readonly COMMITS = 'https://api.github.com/repos/angelocarasig/Terminus/commits';
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
  'vn.developers.name',
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
