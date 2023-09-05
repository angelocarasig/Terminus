import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { UserService } from '../../../shared/services/user/user.service';
import {
  getFavouriteUserNovels, getHighestRatedUserNovels,
  getPlayingUserNovels,
  getRecentUserNovels
} from '../../../shared/helpers/vndb.helper';
import { formattedDate } from '../../../shared/helpers/utilities.helper';
import { UserNovel } from '../../../shared/models/vn/user-novel';
import { NovelContainerWrapper } from '../../models/novel-container-wrapper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Output() refreshNovelsTrigger = new EventEmitter<void>();
  refreshing = false;

  highestRatedNovels: Array<UserNovel>;
  playing: NovelContainerWrapper;
  recent: NovelContainerWrapper;
  favourites: NovelContainerWrapper;

  constructor(public userService: UserService, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.userService.getUserNovels().subscribe({
      next: (updatedUserNovels: Array<UserNovel>) => {
        this.refreshing = false;
        this.highestRatedNovels = getHighestRatedUserNovels(updatedUserNovels);
        this.playing = this.getNovelContainer(getPlayingUserNovels(updatedUserNovels));
        this.recent = this.getNovelContainer(getRecentUserNovels(updatedUserNovels));
        this.favourites = this.getNovelContainer(getFavouriteUserNovels(updatedUserNovels));
      }
    });

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
    return `url(${
      userNovel.vn.screenshots && userNovel.vn.screenshots.length
        ? userNovel.vn.screenshots[Math.floor(Math.random() * userNovel.vn.screenshots!.length)].thumbnail
        : userNovel.vn.screenshots[0].thumbnail
    })`;
  }

  doRefreshNovels(): void {
    this.refreshing = true;
    this.refreshNovelsTrigger.emit();
  }

  private getNovelContainer(novels: Array<UserNovel>): NovelContainerWrapper {
    return {
      novels,
      paginateNumber: 1
    };
  }

  private printDetails(): void {
    console.log('Highest Rated: ', this.highestRatedNovels);
    console.log('Playing: ', this.playing.novels);
    console.log('Recent: ', this.recent.novels);
    console.log('Favourites: ', this.favourites.novels);
  }

  protected readonly formattedDate = formattedDate;
  protected readonly console = console;
}
