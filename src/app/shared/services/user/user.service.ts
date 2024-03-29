import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment.prod';

import { User } from '../../models/user/user';
import { UserNovel } from '../../models/vn/user-novel';
import { LOCAL_STORAGE_KEYS } from '../../../../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null>;
  currentUser$: Observable<User | null>;

  private loadingIndicatorSubject = new BehaviorSubject<boolean>(false);
  loadingIndicator$ = this.loadingIndicatorSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.currentUser);
    const currentUser = storedUser ? JSON.parse(localStorage.getItem(storedUser) || 'null') : null;

    this.currentUserSubject = new BehaviorSubject<User | null>(currentUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /**
   * Creates a user based on the given parameters.
   *
   * @param username The username of the user to be created.
   * @param authToken The optional authentication token.
   * @returns An observable emitting the created User object or null in case of error.
   */
  createUser(username: string, authToken?: string): Observable<User | null> {
    this.loadingIndicatorSubject.next(true);

    // If user already exists, just update localStorage to currentUser
    const storedUserData = localStorage.getItem(username);

    if (storedUserData) {
      this.updateUserWithParams(JSON.parse(storedUserData));
      return of(null);
    }

    return authToken ? this.createWithAuthToken(username, authToken) : this.createWithUsername(username);
  }

  verifyUserToken(authToken: string): Observable<User | null> {
    if (this.currentUserSubject.value == null) {
      throw new Error('User is currently unset.');
    }

    return this.createWithAuthToken(this.currentUserSubject.value!.username, authToken);
  }

  /**
   * Gets the current user subject's value.
   *
   * @Returns either type User or type null
   */
  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Gets the current user subjects user novels as an observable.
   *
   * @Returns the User's ulist property
   */
  getUserNovels(): Observable<Array<UserNovel>> {
    return this.currentUser$.pipe(map(user => user?.ulist!));
  }

  /**
   * Updates the current user with the provided parameters.
   *
   * @param params The parameters to update the user with.
   */
  updateUser(params: any): void {
    if (!this.currentUser$) {
      console.error('User is currently unset.');
      return;
    }
    this.updateUserWithParams(this.currentUserSubject.value!, params);
  }

  /**
   * Removes the current user.
   */
  removeCurrentUser(): void {
    localStorage.removeItem(this.currentUserSubject.value!.username);
    this.currentUserSubject.next(null);
    localStorage.setItem(LOCAL_STORAGE_KEYS.currentUser, 'null');
  }

  private createWithUsername(username: string): Observable<User | null> {
    return this.http.get<any>(`${environment.apiUrl}${environment.endpoints.user}`, { params: new HttpParams().set('q', username) }).pipe(
      switchMap((data: any) => {
        if (!data[username]) {
          this.loadingIndicatorSubject.next(false);
          throw new Error('Username does not exist.');
        }
        const newUser = this.createUserFromData(data[username].username, data[username].id);
        this.updateUserWithParams(newUser);
        return of(newUser);
      })
    );
  }

  private createWithAuthToken(username: string, authToken: string): Observable<User | null> {
    const headers = new HttpHeaders({ Authorization: `token ${authToken}` });
    return this.http.get<any>(`${environment.apiUrl}${environment.endpoints.authinfo}`, { headers }).pipe(
      switchMap((data: any) => {
        if (data.username !== username) {
          this.loadingIndicatorSubject.next(false);
          throw new Error('Username does not match the auth token provider');
        }
        const newUser = this.createUserFromData(data.username, data.id, data.permissions, authToken);
        this.updateUserWithParams(newUser);
        return of(newUser);
      }),
      catchError((error) => {
        console.error('Error creating user with auth token:', error);
        this.loadingIndicatorSubject.next(false);
        throw new Error(error.error);
      })
    );
  }

  private createUserFromData(username: string, id: string, permissions?: Array<string>, authToken?: string): User {
    return {
      username: username,
      uid: id,
      authToken: authToken ?? undefined,
      permissions: permissions ?? new Array<string>()
    };
  }

  private updateUserWithParams(updatedUser: User, params?: any): void {
    updatedUser = { ...updatedUser, ...(params || {}), updatedAt: new Date() };

    this.currentUserSubject.next(updatedUser);
    this.updateLocalStorage(updatedUser);
  }

  private updateLocalStorage(user: User): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.currentUser, user.username);
    localStorage.setItem(user.username, JSON.stringify(user));
    this.loadingIndicatorSubject.next(false);
  }
}
