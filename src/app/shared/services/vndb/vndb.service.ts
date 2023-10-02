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
import { MAX_SEARCH_PAGES, ULIST_PROPS, VN_PROPS } from '../../../../constants';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class VNDBService {
  private searchQuerySubject = new Subject<string>();

  private loadingIndicatorSubject = new BehaviorSubject<boolean>(false);
  loadingIndicator$ = this.loadingIndicatorSubject.asObservable();

  private vnDataTransformer: NovelDataFormatterHelper;

  constructor(private http: HttpClient, private userService: UserService, private messageService: MessageService) {
    this.vnDataTransformer = new NovelDataFormatterHelper(messageService);
  }

  searchResult$: Observable<VNResponseType | null> = this.searchQuerySubject.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(query => query.trim() === '' ? of(null) : this.searchVisualNovelByQuery(query)),
    catchError(error => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Failed to fetch visual novels." });
      return of(null);
    })
  );

  updateSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  private searchVisualNovelByQuery(query: string): Observable<VNResponseType> {
    this.loadingIndicatorSubject.next(true);

    // Create observable from query to use switchMap on it
    return of(query).pipe(
      switchMap(query =>
        this.fetchVisualNovelsByQuery(1, query, [])
      ),
      map(results => {
        results.forEach((visualNovel: VisualNovel) => {
          this.vnDataTransformer.transformVisualNovel(visualNovel);
        });

        this.loadingIndicatorSubject.next(false);
        return { results: results, more: false };
      }),
      catchError(() => {
        this.loadingIndicatorSubject.next(false);
        throw new Error(`Failed to search visual novels by query.`);
      })
    );
  }

  private fetchVisualNovelsByQuery(page: number, query: string, accumulatedResults: VisualNovel[]): Observable<VisualNovel[]> {
    const url = `${environment.apiUrl}${environment.endpoints.vn}`;
    const filters = ['search', '=', `${query}`];
    const body = { filters: filters, results: 100, page: page, fields: VN_PROPS.map(item => item.replace('vn.', '')).join(', ') };

    return this.http.post<VNResponseType>(url, body).pipe(
      switchMap(response => {
        const updatedResults = accumulatedResults.concat(response.results);
        this.messageService.add({ severity: 'info', summary: 'Info', detail: `Pre-loaded ${updatedResults.length} results...` });
        if (response.more) {
          if (page + 1 > MAX_SEARCH_PAGES) {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: `Maximum number of search results for this query has been reached.` });
            this.loadingIndicatorSubject.next(false);
            return of(updatedResults);
          }

          return this.fetchVisualNovelsByQuery(page + 1, query, updatedResults);
        } else {
          this.loadingIndicatorSubject.next(false);
          return of(updatedResults);
        }
      }),
      catchError(error => {
        this.loadingIndicatorSubject.next(false);
        console.error(error);
        throw new Error(`Failed to fetch visual novels by query:`);
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
    const body = { user: user.uid, results: 100, page: page, fields: ULIST_PROPS.join(', ') };

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
