import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements  OnInit {
  showSearchModal: boolean;
  showChangelogModal: boolean;

  constructor() {}

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
}
