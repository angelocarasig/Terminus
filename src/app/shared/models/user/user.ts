import { UserNovel } from '../vn/user-novel';

export interface User {
  username: string;
  uid: string;
  permissions: Array<string>;

  updatedAt?: Date;
  ulist?: Array<UserNovel>;
}
