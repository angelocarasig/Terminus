import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { VndbService } from '../../services/vndb/vndb.service';
import { replaceVNDBDescriptionLink } from '../../helpers/utilities.helper';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('0.1s', style({ opacity: 1 }))
      ])
      // Dismounts from *ngIf so no use for adding fadeOut
    ])
  ]
})
export class SearchModalComponent implements OnInit {
  @Output() outsideClicked = new EventEmitter<void>();
  searchQuery: string;
  searchResultsLoaded: boolean;

  constructor(public vndbService: VndbService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.searchQuery = '';
    this.searchResultsLoaded = true;
  }

  onSearchQueryChange(): void {
    this.searchResultsLoaded = false;
    this.vndbService.updateSearchQuery(this.searchQuery);
  }

  handleClickOutside(): void {
    this.outsideClicked.emit();
  }

  getDescription(description: string): SafeHtml {
    return !description || description === ''
      ? 'No Description Provided.'
      : this.sanitizer.bypassSecurityTrustHtml(replaceVNDBDescriptionLink(description));
  }

  protected readonly console = console;
}
