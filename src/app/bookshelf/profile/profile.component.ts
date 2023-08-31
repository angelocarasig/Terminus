import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { UserNovel } from '../../shared/models/user-novel/user-novel';
import { UserService } from '../../shared/services/user/user.service';
import { formattedDate } from '../../shared/helpers/utilities.helper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() userNovelList: Array<UserNovel>;
  @Output() refreshNovelsTrigger = new EventEmitter<void>();

  data = {
    datasets: [
      {
        label: 'Update Frequency',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'red',
        tension: 0.4
      }
    ]
  };

  constructor(public userService: UserService, private renderer: Renderer2) {
    console.log(this.userService.getUser());
  }

  openProfileInVNDB(): void {
    const url = `https://vndb.org/${this.userService.getUser()?.uid}`;
    const link = this.renderer.createElement('a');
    this.renderer.setAttribute(link, 'href', url);
    this.renderer.setAttribute(link, 'target', '_blank');
    link.click();
  }

  protected readonly formattedDate = formattedDate;
}
