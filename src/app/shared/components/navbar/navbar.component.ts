import { Component, OnInit, Renderer2 } from '@angular/core';

import { UserService } from '../../services/user/user.service';

import { REPOSITORY } from '../../../../constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements  OnInit {
  showSearchModal: boolean;
  showChangelogModal: boolean;
  showOptionsModal: boolean;

  constructor(private userService: UserService, private renderer: Renderer2) {}

  ngOnInit() {
    this.showSearchModal = false;
    this.showChangelogModal = false;
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

  goToHome(): void {
    this.userService.removeCurrentUser();

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
