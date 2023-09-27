import { Component, OnInit, Renderer2 } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { UserService } from '../../services/user/user.service';

import { REPOSITORY } from '../../../../constants';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showSidebar = false;
  showSearchModal = false;
  showChangelogModal = false;
  showOptionsModal = false;

  constructor(public userService: UserService, private confirmationService: ConfirmationService, private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  displaySidebar(): void {
    this.showSidebar = true;
  }

  closeSidebar(): void {
    this.showSidebar = false;
  }

  displaySearchModal(event: Event): void {
    this.showSearchModal = true;
    event.stopPropagation();
  }

  closeSearchModal(): void {
    this.showSearchModal = false;
  }

  displayChangelogModal(event: Event): void {
    this.showChangelogModal = true;
    event.stopPropagation();
  }

  closeChangelogModal(): void {
    this.showChangelogModal = false;
  }

  displayOptionsModal(event: Event): void {
    this.showOptionsModal = true;
    event.stopPropagation();
  }

  closeOptionsModal(): void {
    this.showOptionsModal = false;
  }

  goToHome(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.removeCurrentUser();
      },
      reject: () => {
      }
    });

    // Guard handles the rest
  }

  goToGithub(): void {
    const url = REPOSITORY.URL;
    const link = this.renderer.createElement('a');
    this.renderer.setAttribute(link, 'href', url);
    this.renderer.setAttribute(link, 'target', '_blank');
    link.click();
  }
}
