import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly BASE_URL = 'https://api.vndb.org/kana';
  constructor(private http: HttpClient) {  }

  getUser(username: string, authToken?: string): Observable<any> {
    const options = {
      params: new HttpParams().set('q', username),
    }

    return this.http.get<any>(this.BASE_URL + '/user', options);
  }
}
