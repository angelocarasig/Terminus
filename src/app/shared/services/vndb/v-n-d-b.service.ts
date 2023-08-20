import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {environment} from '../../../environments/environment';

import { User } from '../../models/user/user';
import {UserNovel} from '../../models/user-novel/user-novel';
import {ULIST_PROPS} from '../../../../constants';

@Injectable({
  providedIn: 'root'
})
export class VNDBService {
  constructor(private http: HttpClient) {}

  async getUList(user: User): Promise<Array<UserNovel>> {
    const url = `${environment.apiUrl}${environment.endpoints.ulist}`;

    let userNovels: Array<UserNovel> = [];
    let pageNumber: number = 1;
    let more: boolean = true;

    while (more) {
      const { userNovels: pageUserNovels, more: hasMore } = await this.getUListPage(user, url, pageNumber);
      userNovels = userNovels.concat(pageUserNovels);
      more = hasMore;
      pageNumber++;
    }

    console.log("User novels:");
    console.log(userNovels);
    return userNovels;
  }

  private async getUListPage(user: User, url: string, pageNumber: number): Promise<{ userNovels: Array<UserNovel>, more: boolean }> {
    const body = { user: `${user.uid}`, results: 100, page: pageNumber, fields: ULIST_PROPS.join(', ') };

    let userNovels: Array<UserNovel> = [];
    let more: boolean = false;

    try {
      const response: any = await this.http.post(url, body).toPromise();

      more = response.more;
      response.results.forEach((userNovel: UserNovel) => {
        userNovels.push(userNovel);
      });

      console.log(`Completed retrieving user novels for page ${pageNumber}`);
    } catch (error) {
      console.error(error);
    }

    return { userNovels, more };
  }
}
