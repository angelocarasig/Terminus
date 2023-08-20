import {UserAuthToken} from '../../../../types';
import {UserNovel} from '../user-novel/user-novel';

export class User {
  username: string;
  uid: string;
  authToken: UserAuthToken;

  updatedAt?: Date;
  ulist?: Array<UserNovel>;

  constructor(username: string, id: string, authToken: Partial<UserAuthToken> = {}) {
    this.username = username;
    this.uid = id;
    this.authToken = {
      token: authToken.token || '',
      permissions: authToken.permissions || []
    };
    this.ulist = new Array<UserNovel>();
    this.updatedAt = new Date();
  }
}
