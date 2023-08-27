import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { catchError, concatMap, map, takeWhile } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { User } from '../../models/user/user';
import { ULIST_PROPS } from '../../../../constants';
import { UListResponseType } from '../../../../types';
import { UserService } from '../user/user.service';
import { UserNovel } from '../../models/user-novel/user-novel';

@Injectable({
  providedIn: 'root'
})
export class VndbService {
  constructor(private http: HttpClient, private userService: UserService) {}

  updateUserNovels(user: User): void {
    let userNovels: Array<UserNovel> = [];
    let pageNumber = 1;

    this.getUserNovelByPage(user, pageNumber).pipe(
      takeWhile(response => response.more),
      concatMap(response => {
        userNovels = userNovels.concat(response.results);
        pageNumber++;
        return this.getUserNovelByPage(user, pageNumber);
      }),
      tap({
        next: response => {
          userNovels = userNovels.concat(response.results);
          this.userService.updateUser({ ulist: userNovels });
        },
        error: error => {
          console.error(`Failed to retrieve user novels: ${error}`);
        }
      })
    ).subscribe();
  }

  private getUserNovelByPage(user: User, page: number): Observable<UListResponseType> {
    const url = `${environment.apiUrl}${environment.endpoints.ulist}`;
    const body = { user: user.uid, results: 100, page, fields: ULIST_PROPS.join(', ') };

    return this.http.post<UListResponseType>(url, body).pipe(
      map(response => ({ results: response.results, more: response.more })),
      catchError(error => {
        throw new Error(`Failed to retrieve user novels: ${error}`);
      })
    );
  }
}
