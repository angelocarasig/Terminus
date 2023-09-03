import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';

import { UserService } from '../../../shared/services/user/user.service';

import { getFavouriteUserNovels, getHighestRatedUserNovels, getPlayingUserNovels, getRecentUserNovels } from '../../../shared/helpers/ulist.helper';
import { formattedDate } from '../../../shared/helpers/utilities.helper';

import { UserNovel } from '../../../shared/models/user-novel/user-novel';
import { NovelContainerWrapper } from '../../models/novel-container-wrapper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() userNovelList: Array<UserNovel>;
  @Output() refreshNovelsTrigger = new EventEmitter<void>();

  highestRatedNovels: Array<UserNovel>;

  playing: NovelContainerWrapper;
  recent: NovelContainerWrapper;
  favourites: NovelContainerWrapper;

  constructor(public userService: UserService, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.highestRatedNovels = getHighestRatedUserNovels(this.userNovelList);

    this.playing = {
      novels: getPlayingUserNovels(this.userNovelList),
      paginateNumber: 1,
    };

    this.recent = {
      novels: getRecentUserNovels(this.userNovelList),
      paginateNumber: 1,
    }

    this.favourites = {
      novels: getFavouriteUserNovels(this.userNovelList),
      paginateNumber: 1,
    }

    this.printDetails();
  }

  openProfileInVNDB(): void {
    const url = `https://vndb.org/${this.userService.getUser()?.uid}`;
    const link = this.renderer.createElement('a');
    this.renderer.setAttribute(link, 'href', url);
    this.renderer.setAttribute(link, 'target', '_blank');
    link.click();
  }

  getBackgroundImage(userNovel: UserNovel): string {
    return `url(${userNovel.vn.screenshots[0]?.thumbnail.replace('t.vndb.org/st', 't.vndb.org/sf')})`;
  }

  doRefreshNovels(): void {
    console.log('Refreshing novels...');
    this.refreshNovelsTrigger.emit();
  }

  private printDetails(): void {
    console.log('Ulist: ', this.userNovelList);
    console.log('Highest Rated: ', this.highestRatedNovels);
    console.log('Playing: ', this.playing.novels);
    console.log('Recent: ', this.recent.novels);
    console.log('Favourites: ', this.favourites.novels);
  }

  protected readonly formattedDate = formattedDate;
}
