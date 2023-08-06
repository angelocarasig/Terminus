import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {LoginHelper} from '../../shared/helpers/login/login.helper';
import {UserService} from '../../shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = new FormControl('', [Validators.required, Validators.minLength(3)]);
  authToken = new FormControl('');

  constructor(private loginHelper: LoginHelper, private userService: UserService) {  }

  processUser(): void {
    if (!this.username.valid || this.username.value == null) {
      console.log('Empty username!');
      return;
    }

    let validUser: boolean;

    this.loginHelper.verifyUser(this.username.value!, this.authToken.value!).then(
      value => validUser = value
    );

    console.log(`Set active user to: ${this.userService.getCurrentUser()?.username}`);
  }
}
