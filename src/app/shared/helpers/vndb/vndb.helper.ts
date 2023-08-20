import { Injectable } from '@angular/core';

import {VndbService} from '../../services/vndb/vndb.service';
import { User } from '../../models/user/user';
import { UserNovel } from '../../models/user-novel/user-novel';
import { firstValueFrom } from 'rxjs';
import { UListResponseType } from '../../../../types';
import { UserService } from '../../services/user/user.service';

@Injectable({ providedIn: 'root' })
export class VndbHelper {
  constructor(private vndbService: VndbService, private userService: UserService) {
  }

  async updateUserNovels(user: User): Promise<void> {
    let userNovels: Array<UserNovel> = new Array<UserNovel>();
    let pageNumber = 1;
    let more = true;

    while (more) {
      const { userNovels: pageUserNovels, more: hasMore } = await this.getUserNovelByPage(user, pageNumber);
      userNovels = userNovels.concat(pageUserNovels);
      more = hasMore;
      pageNumber++;
    }

    console.log("User novels:", userNovels);
    this.userService.updateCurrentUser({ulist: userNovels});
  }

  private async getUserNovelByPage(user: User, page: number): Promise<any> {
    return await firstValueFrom(this.vndbService.getUserNovelByPage(user, page)).then(
      (response: UListResponseType) => {
        return {userNovels: response.results, more: response.more};
      },
      (error) => {
        throw new Error(`Failed to retrieve user novels... ${error}`).stack;
      }
    )
  }
}
