import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {UserAuthToken} from '../../../../types';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly BASE_URL = 'https://api.vndb.org/kana';

  constructor(private http: HttpClient) {
  }

  getUser(username: string, authToken?: string): Observable<any> {
    return this.http.get<any>(this.BASE_URL + '/user', {params:  new HttpParams().set('q', username)});
  }

  getAuthInfo(authToken: string): Observable<any> {
    return this.http.get<any>(this.BASE_URL + 'authinfo', new HttpHeaders({Authorization: authToken}));
  }
}
