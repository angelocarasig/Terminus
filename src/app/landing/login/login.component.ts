import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  authToken = new FormControl('');
  errorMessage = '';
  loading = false;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    if (this.userService.currentUser$ !== null) {
      this.router.navigate(['/bookshelf']).then();
    }
  }

  processUser(): void {
    console.log('Processing user.');
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

    this.userService.createUser(this.username.value, this.authToken.value).subscribe({
      next: () => {
        this.loading = false;
        if (this.errorMessage !== '') return;

        this.router.navigate(['/bookshelf']).then();
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
