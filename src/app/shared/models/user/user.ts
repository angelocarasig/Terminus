import {UserAuthToken} from '../../../../types';

export class User {
  username: string;
  authToken: UserAuthToken;

  constructor(username: string, authToken: Partial<UserAuthToken> = {}) {
    this.username = username;
    this.authToken = {
      token: authToken.token || '',
      permissions: authToken.permissions || []
    };
  }
}
