import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { UserService } from '../../../shared/services/user/user.service';

import { formattedDate } from '../../../shared/helpers/utilities.helper';
import { isFinished, isPlaying, modifiedInLastThirtyDays } from '../../../shared/pipes/novel-filter/novel-filter.helper';
import { sortByPopularity, sortByRecentlyModified, sortByVoteScore } from '../../../shared/pipes/novel-sort/novel-sort.helper';

import { UserNovel } from '../../../shared/models/vn/user-novel';
import { SexualRating, ViolenceRating } from '../../../shared/models/vn/visual-novel';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'profile-shell',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Output() refreshNovelsTrigger = new EventEmitter<void>();
  refreshing = false;
  bookScaleValue = 1;

  constructor(public userService: UserService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.userService.getUserNovels().subscribe({
      next: () => {
        this.refreshing = false;
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'List updated!'});
      }
    });
  }

  openProfileInVNDB(): void {
    const url = `https://vndb.org/${this.userService.getUser()?.uid}`;
    window.open(url, '_blank');
  }

  getBackgroundImage(userNovel: UserNovel): string {
    const defaultThumbnail = `url(${userNovel.vn.screenshots[0].thumbnail}`;
    let selectedThumbnailIndex = Math.floor(Math.random() * userNovel.vn.screenshots!.length);

    while (selectedThumbnailIndex < userNovel.vn.screenshots.length) {
      const sValue = userNovel.vn.screenshots[selectedThumbnailIndex].sexualFormatted;
      const vValue = userNovel.vn.screenshots[selectedThumbnailIndex].violenceFormatted;

      if (sValue !== SexualRating.EXPLICIT && sValue !== SexualRating.SUGGESTIVE &&
        vValue !== ViolenceRating.BRUTAL && vValue !== ViolenceRating.VIOLENT) {
        return `url(${userNovel.vn.screenshots[selectedThumbnailIndex].thumbnail}`;
      }

      selectedThumbnailIndex++;
    }
    return defaultThumbnail;
  }

  doRefreshNovels(): void {
    this.refreshing = true;
    this.refreshNovelsTrigger.emit();
    this.messageService.add({severity: 'info', summary: 'Info', detail: 'Refreshing novel list...'})
  }

  getSliderTooltip(): string {
    return `Scale: ${this.bookScaleValue}`;
  }

  protected readonly formattedDate = formattedDate;
  protected readonly isPlaying = isPlaying;
  protected readonly sortByRecentlyModified = sortByRecentlyModified;
  protected readonly filterModByLastThirtyDays = modifiedInLastThirtyDays;
  protected readonly sortByVoteScore = sortByVoteScore;
  protected readonly sortByPopularity = sortByPopularity;
  protected readonly isFinished = isFinished;
}
