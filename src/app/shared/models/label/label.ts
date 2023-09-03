export interface Label {
  id: number;
  label: LabelType | string;
}

export enum LabelType {
  Playing = 'Playing',
  Finished = 'Finished',
  Stalled = 'Stalled',
  Dropped = 'Dropped',
  Wishlist = 'Wishlist',
  Blacklist = 'Blacklist',
  Voted = 'Voted',
}
