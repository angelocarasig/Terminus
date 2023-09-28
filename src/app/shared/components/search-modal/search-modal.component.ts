import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

import { VNDBService } from '../../services/vndb/vndb.service';

import { sortByPopularity } from '../../pipes/novel-sort/novel-sort.helper';
import { openUrlInNewTab } from '../../helpers/utilities.helper';
import { VisualNovel } from '../../models/vn/visual-novel';

@Component({
  selector: 'shared-search-modal',
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

  constructor(public vndbService: VNDBService, private router: Router) {
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

  getDescription(description: string): string {
    try {
      let output = description;
      let startIndex = output.indexOf('[url=');

      while (startIndex !== -1) {
        const equalIndex = output.indexOf(']', startIndex);
        const link = output.substring(startIndex + 5, equalIndex);

        if (link) {
          const endTagStart = output.indexOf('[/url]', equalIndex);
          if (endTagStart !== -1) {
            const linkText = output.substring(equalIndex + 1, endTagStart);
            const aTag = `<a href='${link}' target='_blank'>${linkText}</a>`;

            output = output.substring(0, startIndex) + aTag + output.substring(endTagStart + 6);
          }
        }

        startIndex = output.indexOf('[url=', startIndex + 1);
      }

      return output;

    } catch (e) {
      return 'No Description Provided.';
    }
  }

  openVNLink(book: VisualNovel): void {
    openUrlInNewTab(`https://vndb.org/${book.id}`);
  }

  openBook(event: VisualNovel): void {
    this.router.navigate(['/vn'], { state: { novel: event } });
  }

  protected readonly console = console;
  protected readonly sortByPopularity = sortByPopularity;
}
