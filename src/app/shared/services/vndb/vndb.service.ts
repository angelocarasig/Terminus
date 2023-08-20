import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment.prod';

import { User } from '../../models/user/user';
import {ULIST_PROPS} from '../../../../constants';
import { UListResponseType } from '../../../../types';

@Injectable({
  providedIn: 'root'
})
export class VndbService {
  constructor(private http: HttpClient) {}

  getUserNovelByPage(user: User, page: number): Observable<UListResponseType> {
    const url = `${environment.apiUrl}${environment.endpoints.ulist}`;
    const body = { user: `${user.uid}`, results: 100, page: page, fields: ULIST_PROPS.join(', ') };

    return this.http.post<any>(url, body);
  }
}
