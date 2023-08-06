import {LoginService} from '../../services/login/login.service';
import {Injectable} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user/user';
import {firstValueFrom} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginHelper {

  constructor(private loginService: LoginService, private userService: UserService) {
  }

  async verifyUser(username: string, authToken?: string): Promise<boolean> {
    console.log(`Verifying for ${username} with authToken: ${authToken}`);

    const validUser = await firstValueFrom(this.loginService.getUser(username, authToken)).then(
      value => {
        if (Object.keys(value).length !== 1) return false;
        if (value[`${username}`] == null) return false;
        return value[`${username}`].username === username;
      },
      reason => {
        console.log(reason);
        return false;
      }
    );

    if (validUser) {
      console.log('Finished execution successfully.');
      console.log('Updating current user...');
      this.userService.setCurrentUser(new User(username));
    }

    return validUser;
  }
}
