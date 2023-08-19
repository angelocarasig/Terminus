import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly BASE_URL = 'https://api.vndb.org/kana';

  constructor(private http: HttpClient) {
  }

  getUser(username: string): Observable<any> {
    return this.http.get<any>(this.BASE_URL + '/user', { params: new HttpParams().set('q', username) });
  }

  getAuthInfo(authToken: string): Observable<any> {
    return this.http.get<any>(this.BASE_URL + 'authinfo', { headers: new HttpHeaders({ Authorization: authToken }) });
  }
}
