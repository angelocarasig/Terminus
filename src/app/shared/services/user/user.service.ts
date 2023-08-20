import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user/user';
import { LOCAL_STORAGE_KEYS } from '../../../../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly currentUserSubject: BehaviorSubject<User | undefined>;

  constructor() {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.currentUser);
    this.currentUserSubject = new BehaviorSubject<User | undefined>(storedUser ? JSON.parse(storedUser) : undefined);
  }

  getCurrentUser(): User | undefined {
    return this.currentUserSubject.getValue();
  }

  getCurrentUserAsObservable(): Observable<User | undefined> {
    return this.currentUserSubject;
  }

  setCurrentUser(newUser: User): void {
    newUser.updatedAt = new Date();
    this.currentUserSubject.next(newUser);
    this.updateLocalStorage(newUser);
  }

  updateCurrentUser(properties: any): void {
    const updatedUser = { ...this.currentUserSubject.value, ...properties, updatedAt: new Date() };
    this.currentUserSubject.next(updatedUser);
    this.updateLocalStorage(updatedUser);
  }

  removeCurrentUser(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.currentUser);
    this.currentUserSubject.next(undefined);
    this.updateLocalStorage(undefined);
  }

  private updateLocalStorage(user: User | undefined): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.currentUser, JSON.stringify(user));
  }
}
