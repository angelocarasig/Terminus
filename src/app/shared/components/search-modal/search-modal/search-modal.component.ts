import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements OnInit {
  @Output() outsideClicked = new EventEmitter<void>();
  searchResultPlaceholder: any[];

  ngOnInit() {
    this.searchResultPlaceholder = Array.from({ length: 20 }, (_, i) => ({
      heading: `Placeholder ${i}`,
      subHeading: `Sub-heading ${i}`
    }));
  }

  handleClickOutside(): void {
    this.outsideClicked.emit();
  }
}
