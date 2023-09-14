import { UserNovel } from '../vn/user-novel';

export interface User {
  username: string;
  uid: string;
  authToken?: string;
  permissions: Array<string>;

  updatedAt?: Date;
  ulist?: Array<UserNovel>;
}
