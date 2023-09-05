import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  errorMessage = 'Username is required.';

  constructor(public userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      authToken: ['']
    });
  }

  ngOnInit() {
    if (this.userService.currentUser$ !== null) {
      this.router.navigate(['/bookshelf']).then();
    }
  }

  processUser(): void {
    if (this.form.invalid) return;

    const usernameValue = this.form.get('username')!.value;
    const authTokenValue = this.form.get('authToken')!.value === '' ? null : this.form.get('authToken')!.value;

    this.userService.createUser(usernameValue, authTokenValue).subscribe({
      next: () => {
        this.router.navigate(['/bookshelf']).then();
      },
      error: (error) => {
        this.submitted = true;
        this.errorMessage = error.message;
      }
    });
  }
}
