import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  getUser(username: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${environment.endpoints.user}`, { params: new HttpParams().set('q', username) });
  }

  getAuthInfo(authToken: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${environment.endpoints.authinfo}`, { headers: new HttpHeaders({ Authorization: authToken }) });
  }
}
