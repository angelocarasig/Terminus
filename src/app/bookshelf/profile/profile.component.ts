import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';

import { UserService } from '../../shared/services/user/user.service';

import { getHighestRatedUserNovels } from '../../shared/helpers/ulist.helper';
import { formattedDate } from '../../shared/helpers/utilities.helper';

import { UserNovel } from '../../shared/models/user-novel/user-novel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() userNovelList: Array<UserNovel>;
  @Output() refreshNovelsTrigger = new EventEmitter<void>();

  highestRatedNovels: Array<UserNovel>;

  constructor(public userService: UserService, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.highestRatedNovels = getHighestRatedUserNovels(this.userNovelList);

    console.log(this.userNovelList);
    console.log(this.highestRatedNovels);
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

  protected readonly formattedDate = formattedDate;
}
