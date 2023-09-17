import { VisualNovel } from './app/shared/models/vn/visual-novel';
import { UserNovel } from './app/shared/models/vn/user-novel';

import { MONTHS } from './constants';

interface BaseResponseType<T> {
  results: Array<T>;
  more: boolean;
}

export type VNResponseType = BaseResponseType<VisualNovel>;

export type UListResponseType = BaseResponseType<UserNovel>;

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

export type Month = typeof MONTHS[number];

export type HeatmapAction = 'Added' | 'Modified' | 'Voted'

export interface HeatmapEntry {
  name: Month;
  action: HeatmapAction;
  data: UserNovel
}

export type ContentSensitivity = 'Everyone' | 'Questionable' | 'Explicit';
