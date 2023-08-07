import {Injectable} from '@angular/core';

import {firstValueFrom} from 'rxjs';

import {User} from '../../models/user/user';
import {LoginService} from '../../services/login/login.service';
import {UserService} from '../../services/user/user.service';

@Injectable({providedIn: 'root'})
export class LoginHelper {

  constructor(private loginService: LoginService, private userService: UserService) {
  }

  async verifyUser(username: string, authToken?: string): Promise<boolean> {
    const validUser = await firstValueFrom(this.loginService.getUser(username, authToken)).then(
      value => {
        console.log(value);
        if (Object.keys(value).length !== 1) {
          throw new Error('Length not equal to 1');
        }

        if (value[`${username}`] == null) {
          throw new Error('User doesn\'t exist');
        }

        if (value[`${username}`].username !== username) {
          throw new Error('Username in VNDB does not match what was provided.');
        }

        return true;
      },
      reason => {
        console.log(reason);
        return false;
      }
    );

    validUser ? this.userService.setCurrentUser(new User(username)) : this.userService.removeCurrentUser();

    return validUser;
  }
}
