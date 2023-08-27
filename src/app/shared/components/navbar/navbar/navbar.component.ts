import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements  OnInit {
  showModal: boolean;

  constructor() {}

  ngOnInit() {
    this.showModal = false;
  }

  displaySearchModal(event: Event): void {
    this.showModal = true;
    event.stopPropagation();
  }

  closeSearchModal(): void {
    this.showModal = false;
  }
}
