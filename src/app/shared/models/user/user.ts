import {UserNovel} from '../user-novel/user-novel';

export interface User {
  username: string;
  uid: string;
  permissions: Array<string>;

  updatedAt?: Date;
  ulist?: Array<UserNovel>;
}
