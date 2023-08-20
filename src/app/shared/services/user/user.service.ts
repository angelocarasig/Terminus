import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user/user';
import {LOCAL_STORAGE_KEYS} from '../../../../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | undefined>;

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

  setCurrentUser(newUserDetails: User): void {
    newUserDetails.updatedAt = new Date();
    this.currentUserSubject.next(newUserDetails);
    localStorage.setItem(LOCAL_STORAGE_KEYS.currentUser, JSON.stringify(this.currentUserSubject.value));
  }

  updateCurrentUser(properties: any): void {
    properties.updatedAt = new Date();
    this.currentUserSubject.next({ ...this.currentUserSubject.value, ...properties });
    localStorage.setItem(LOCAL_STORAGE_KEYS.currentUser, JSON.stringify(this.currentUserSubject.value));
  }

  removeCurrentUser(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.currentUser);
    this.currentUserSubject.next(undefined);
  }
}
