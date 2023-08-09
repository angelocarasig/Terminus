import {Injectable} from '@angular/core';

import {firstValueFrom} from 'rxjs';
import {LoginService} from '../../services/login/login.service';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user/user';

@Injectable({providedIn: 'root'})
export class LoginHelper {

  constructor(private loginService: LoginService, private userService: UserService) {
  }

  async createUser(username: string, authToken?: string): Promise<any> {
    try {
      const userDetails = authToken
        ? await this.validateAuthToken(authToken)
        : await this.validateUsername(username);

      return {
        username: userDetails.username,
        authToken: {
          token: authToken,
          permissions: userDetails.authToken.permissions;
        }
      };
    }
    catch (error) {
      throw new Error(error.message);
    }
  }

  private async validateAuthToken(authToken: string): Promise<User> {
    const response = await firstValueFrom(this.loginService.getAuthInfo(authToken));
    if (response && response.username === authToken) {
      return response;
    }
    throw new Error(`Invalid username or token`);
  }

  private async validateUsername(username: string): Promise<User> {
    const response = await firstValueFrom(this.loginService.getUser(username));
    if (response && response[username]) {
      return response[username];
    }
    throw new Error(`User '${username}' not found`);
  }
}
