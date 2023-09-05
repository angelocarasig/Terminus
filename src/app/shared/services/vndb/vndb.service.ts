import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, of, Subject, tap } from 'rxjs';
import { catchError, concatMap, map, switchMap, takeWhile } from 'rxjs/operators';

import { environment } from '../../../../environments/environment.prod';

import { UserService } from '../user/user.service';

import { User } from '../../models/user/user';
import { UserNovel } from '../../models/vn/user-novel';
import { UListResponseType, VNResponseType } from '../../../../types';
import { ULIST_PROPS, VN_PROPS } from '../../../../constants';
import { VNDataPipe } from '../../helpers/new-vn-pipe.helper';
import { VisualNovel } from '../../models/vn/visual-novel';

@Injectable({
  providedIn: 'root'
})
export class VndbService {
  private searchQuerySubject = new Subject<string>();

  private loadingIndicatorSubject = new BehaviorSubject<boolean>(false);
  loadingIndicator$ = this.loadingIndicatorSubject.asObservable();

  private vnDataPipe: VNDataPipe;

  constructor(private http: HttpClient, private userService: UserService) {
    this.vnDataPipe = new VNDataPipe();
  }

  searchResult$: Observable<VNResponseType | null> = this.searchQuerySubject.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(query => query.trim() === '' ? of(null) : this.searchVisualNovelByQuery(query)),
    catchError(error => {
      console.error(error);
      return of(null);
    })
  );

  updateSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

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
          userNovels.forEach((userNovel: UserNovel) => {
            this.vnDataPipe.transformUserNovel(userNovel);
          })

          this.userService.updateUser({ ulist: userNovels });
        },
        error: error => {
          console.error(`Failed to retrieve user novels: ${error}`);
        }
      })
    ).subscribe();
  }

  private searchVisualNovelByQuery(query: string): Observable<VNResponseType> {
    this.loadingIndicatorSubject.next(true);

    const url = `${environment.apiUrl}${environment.endpoints.vn}`;
    const filters = ['search', '=', `${query}`];
    const body = { filters: filters, results: 100, fields: VN_PROPS.map(item => item.replace('vn.', '')).join(', ') };

    return this.http.post<VNResponseType>(url, body).pipe(
      map(response => {
        response.results.forEach((visualNovel: VisualNovel) => {
          this.vnDataPipe.transformVisualNovel(visualNovel);
        })

        this.loadingIndicatorSubject.next(false);

        return ({ results: response.results, more: response.more });
      }),
      catchError(error => {
        this.loadingIndicatorSubject.next(false);

        throw new Error(`Failed to retrieve user novels: ${error}`);
      })
    );
  }

  private getUserNovelByPage(user: User, page: number): Observable<UListResponseType> {
    const url = `${environment.apiUrl}${environment.endpoints.ulist}`;
    const body = { user: user.uid, results: 100, page, fields: ULIST_PROPS.join(', ') };

    return this.http.post<UListResponseType>(url, body).pipe(
      map(response => ({ results: response.results, more: response.more })),
      catchError(error => {
        throw new Error(error);
      })
    );
  }
}
