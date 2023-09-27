import { VisualNovel } from './app/shared/models/vn/visual-novel';
import { UserNovel } from './app/shared/models/vn/user-novel';

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

export type ContentSensitivity = 'Everyone' | 'Questionable' | 'Explicit';
