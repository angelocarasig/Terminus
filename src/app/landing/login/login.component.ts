import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user/user.service';
import { LoginHelper } from '../../shared/helpers/login/login.helper';
import { User } from '../../shared/models/user/user';

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

  constructor(private loginHelper: LoginHelper, private userService: UserService, private router: Router) {}

  async processUser(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';

    if (this.username.pristine || !this.username.valid) {
      this.errorMessage = 'Username must not be blank!';
      this.loading = false;
      return;
    }

    if (this.username.value == null || this.authToken.value == null) {
      this.errorMessage = 'username or the provided auth token was somehow null.';
      this.loading = false;
      return;
    }

    await this.loginHelper.createUser(this.username.value, this.authToken.value).then(
      (user: User): void => {
        this.userService.setCurrentUser(user);
      },
      (error: Error): void => {
        // If it fails for any reason just reset the user
        this.userService.removeCurrentUser();
        this.errorMessage = error.message;
      }
    );

    this.loading = false;
    if (this.errorMessage !== '') return;

    await this.router.navigate(['/bookshelf']);
  }
}
