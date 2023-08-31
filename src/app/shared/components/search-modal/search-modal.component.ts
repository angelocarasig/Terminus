import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { VndbService } from '../../services/vndb/vndb.service';
import { stripVNDBLink, stripNewline } from '../../helpers/utilities.helper';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements OnInit {
  @Output() outsideClicked = new EventEmitter<void>();
  protected readonly console = console;
  searchQuery: string;

  constructor(public vndbService: VndbService) {
  }

  ngOnInit() {
    this.searchQuery = '';
  }

  onSearchQueryChange(): void {
    this.vndbService.updateSearchQuery(this.searchQuery);
  }

  handleClickOutside(): void {
    this.outsideClicked.emit();
  }

  formatDescription(inputString: string): string {
    return !inputString || inputString === '' ? '' : stripNewline(stripVNDBLink(inputString));
  }
}
