import { Component, Input } from '@angular/core';
import { UserNovel } from '../../../shared/models/vn/user-novel';

@Component({
  selector: 'app-profile-novel-container',
  templateUrl: './profile-novel-container.component.html',
  styleUrls: ['./profile-novel-container.component.scss']
})
export class ProfileNovelContainerComponent {
  @Input() title: string;
  @Input() novels: Array<UserNovel> | null;

  paginateNumber = 1;

  handlePageChange(page: number): void {
    this.paginateNumber = page;
  }
}
