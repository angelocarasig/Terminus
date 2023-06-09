import { Component, OnInit } from '@angular/core';
import { VNDBService } from '../../services/vndb/vndb.service';
import { LOGIN_MODES } from 'src/app/constants';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginModes: Array<string>;

  loginMode: string;
  username: string;
  apitoken: string;

  loading: boolean = false;
  validUserDetails: boolean;
  errorMessage: string;

  constructor(private userService: UserService, private vndbService: VNDBService, private router: Router) {}

  ngOnInit(): void {
    this.loginModes = LOGIN_MODES;

    this.validUserDetails = true;
    this.errorMessage = '';
  }

  async verifyLoginDetails(): Promise<void> {
    this.loading = true;

    const userDetails = new User(
      this.userService,
      this.vndbService,
      this.loginMode,
      this.username,
      this.loginMode === 'Auth' ? this.apitoken : undefined
    );

    try {
      const isUserValid = await userDetails.verifyUser();
      if (!isUserValid) {
        this.validUserDetails = false;
        this.errorMessage = 'Invalid Username';
        return;
      }
      else console.log(userDetails);

      if (this.loginMode === 'Auth') {
        const isTokenValid = await userDetails.verifyToken();
        if (!isTokenValid) {
          this.validUserDetails = false;
          this.errorMessage = 'Invalid API Token';
          return;
        }
      }
      else if (this.loginMode !== "Basic") {
        this.validUserDetails = false;
        this.errorMessage = 'Please Select A Login Mode';
        return;
      }

      console.log("Valid!");
      this.validUserDetails = true;
      await userDetails.setUList();
      this.userService.setCurrentUser(userDetails);
      this.router.navigate(['/bookshelf']);

    } catch (error) {
      console.error(error);
      this.validUserDetails = false;
      this.errorMessage = 'An error occurred during login.';
    } finally {
      this.loading = false;
    }
  }
}
