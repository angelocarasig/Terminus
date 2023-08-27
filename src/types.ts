import { UserNovel } from './app/shared/models/user-novel/user-novel';

export type UListResponseType = {
  results: Array<UserNovel>,
  more: boolean,
}

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}
