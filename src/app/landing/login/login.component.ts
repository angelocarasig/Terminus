import {Component, effect} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {LoginHelper} from '../../shared/helpers/login/login.helper';
import {UserService} from '../../shared/services/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = new FormControl('', [Validators.required]);
  authToken = new FormControl('');
  errorMessage = '';
  loading = false;

  constructor(private loginHelper: LoginHelper, private userService: UserService, private router: Router) {  }

  async processUser(): Promise<void> {
    this.loading = true;

    if (this.username.pristine || !this.username.valid) {
      this.errorMessage = 'Username must not be blank!';
      this.loading = false;
      return;
    }

    let validUser: boolean;

    await this.loginHelper.verifyUser(this.username.value!, this.authToken.value!).then(
      response => {
        validUser = response;
      },
      error => {
        this.errorMessage = error.message;
      }
    );

    this.loading = false;

    console.log(`Active user set to '${this.userService.getCurrentUser()?.username}'`);
  }
}
