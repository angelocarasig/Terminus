import { UserNovel } from './app/shared/models/user-novel/user-novel';
import { VN } from './app/shared/models/vn/VN';

export type VNResponseType = {
  results: Array<VN>,
  more: boolean,
}

export type UListResponseType = {
  results: Array<UserNovel>,
  more: boolean,
}

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}
