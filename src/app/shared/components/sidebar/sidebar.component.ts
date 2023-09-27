import { Component, EventEmitter, Input, Output } from '@angular/core';

import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() showSidebar: boolean;
  @Output() handleHome = new EventEmitter<any>();
  @Output() handleHideSidebar = new EventEmitter<void>();

  constructor(public userService: UserService) {
  }

  hideSidebar(): void {
    this.handleHideSidebar.emit();
  }

  goToHome(event: Event): void {
    this.hideSidebar();
    this.handleHome.emit(event);
  }
}
