import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { LoginService } from '../../services/login/login.service';
import { User } from '../../models/user/user';

@Injectable({ providedIn: 'root' })
export class LoginHelper {

  constructor(private loginService: LoginService) {
  }

  async createUser(username: string, authToken: string): Promise<User> {
    const userDetails = authToken !== ''
      ? await this.validateAuthToken(username, authToken)
      : await this.validateUsername(username);

    return {
      username: userDetails.username,
      uid: userDetails.id,
      authToken: {
        token: authToken,
        permissions: userDetails?.authToken?.permissions
      },
    };
  }

  private async validateUsername(username: string): Promise<any> {
    const response = await firstValueFrom(this.loginService.getUser(username));
    if (response && response[username]) {
      return response[username];
    }
    throw new Error(`User '${username}' not found`);
  }

  private async validateAuthToken(username: string, authToken: string): Promise<any> {
    return await firstValueFrom(this.loginService.getAuthInfo(authToken))
      .then(
        // Safe to assume that a response will contain at least a username
        (response): HttpResponse<any> => {
          if (response.username !== username) throw new Error(`Username and the respective auth token does not match!`);
          return response;
        },

        (error): HttpErrorResponse => {
          throw new Error('Auth token was invalid.');
        }
      );
  }
}
