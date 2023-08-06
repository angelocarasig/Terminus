import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  withAuthToken: boolean = false;

  toggleWithAuthToken(): void {
    this.withAuthToken = !this.withAuthToken;
  }
}
