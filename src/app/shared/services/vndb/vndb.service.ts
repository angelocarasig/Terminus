import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, of, Subject } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment.prod';

import { UserService } from '../user/user.service';

import { NovelDataFormatterHelper } from '../../helpers/novel-data-formatter.helper';

import { User } from '../../models/user/user';
import { UserNovel } from '../../models/vn/user-novel';
import { UListResponseType, VNResponseType } from '../../../../types';
import { VisualNovel } from '../../models/vn/visual-novel';
import { ULIST_PROPS, VN_PROPS } from '../../../../constants';

@Injectable({
  providedIn: 'root'
})
export class VNDBService {
  private searchQuerySubject = new Subject<string>();

  private loadingIndicatorSubject = new BehaviorSubject<boolean>(false);
  loadingIndicator$ = this.loadingIndicatorSubject.asObservable();

  private vnDataTransformer: NovelDataFormatterHelper;

  constructor(private http: HttpClient, private userService: UserService) {
    this.vnDataTransformer = new NovelDataFormatterHelper();
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

  private searchVisualNovelByQuery(query: string): Observable<VNResponseType> {
    this.loadingIndicatorSubject.next(true);

    const url = `${environment.apiUrl}${environment.endpoints.vn}`;
    const filters = ['search', '=', `${query}`];
    const body = { filters: filters, results: 100, fields: VN_PROPS.map(item => item.replace('vn.', '')).join(', ') };

    return this.http.post<VNResponseType>(url, body).pipe(
      map(response => {
        response.results.forEach((visualNovel: VisualNovel) => {
          this.vnDataTransformer.transformVisualNovel(visualNovel);
        });

        this.loadingIndicatorSubject.next(false);
        return ({ results: response.results, more: response.more });
      }),
      catchError(error => {
        this.loadingIndicatorSubject.next(false);
        console.error(error);
        throw new Error(`Failed to retrieve user novels:`);
      })
    );
  }

  updateUserNovels(user: User): void {
    let pageNumber = 1;

    this.fetchUserNovels(user, pageNumber, new Array<UserNovel>())
      .subscribe({
        next: (updatedUserNovels: Array<UserNovel>) => {
          updatedUserNovels.forEach((userNovel: UserNovel) => {
            this.vnDataTransformer.transformUserNovel(userNovel);
          });

          this.userService.updateUser({ ulist: updatedUserNovels });
        },
        error: (error: Error) => {
          throw new Error(error.stack);
        }
      });
  }

  private fetchUserNovels(user: User, pageNumber: number, userNovels: Array<UserNovel>): Observable<Array<UserNovel>> {
    return this.getUserNovelByPage(user, pageNumber).pipe(
      concatMap(response => {
        userNovels = userNovels.concat(response.results);
        if (response.more) {
          pageNumber++;
          return this.fetchUserNovels(user, pageNumber, userNovels);
        }

        return of(userNovels);
      }),
      catchError(error => {
        throw new Error(error);
      })
    );
  }

  private getUserNovelByPage(user: User, page: number): Observable<UListResponseType> {
    const url = `${environment.apiUrl}${environment.endpoints.ulist}`;
    const body = { user: user.uid, results: 100, page, fields: ULIST_PROPS.join(', ') };

    return this.http.post<UListResponseType>(url, body).pipe(
      map(response => {
        return ({ results: response.results, more: response.more });
      }),
      catchError(error => {
        throw new Error(error);
      })
    );
  }
}
