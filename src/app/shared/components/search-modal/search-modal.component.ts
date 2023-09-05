import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { VndbService } from '../../services/vndb/vndb.service';
import { stripVNDBLink, stripNewline } from '../../helpers/utilities.helper';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('0.1s', style({ opacity: 1 })),
      ]),
      // Dismounts from *ngIf so no use for adding fadeOut
    ])
  ]
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
    return !inputString || inputString === ''
      ? 'No Description Provided.'
      : stripNewline(stripVNDBLink(inputString));
  }
}
