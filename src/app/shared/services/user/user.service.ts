import {Injectable, signal, WritableSignal} from '@angular/core';

import {User} from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly currentUser: WritableSignal<User | undefined>;

  constructor() {

    this.currentUser = signal(undefined);
  }

  getCurrentUser(): User | undefined {
    return this.currentUser.asReadonly()();
  }

  setCurrentUser(newUserDetails: User): void {
    this.currentUser.set(newUserDetails);
  }

  removeCurrentUser(): void {
    this.currentUser.set(undefined);
  }
}
