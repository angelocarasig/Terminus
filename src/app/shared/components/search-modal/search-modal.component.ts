import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { VNDBService } from '../../services/vndb/vndb.service';

import { PaginatorState } from 'primeng/paginator';

import { sortByPopularity } from '../../pipes/novel-sort/novel-sort.helper';
import { openUrlInNewTab } from '../../helpers/utilities.helper';
import { VisualNovel } from '../../models/vn/visual-novel';
import { VNResponseType } from '../../../../types';

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
  @ViewChild('resultContainer') resultContainer: ElementRef;

  searchQuery: string;
  searchResultsLoaded: boolean;

  searchResults: Array<VisualNovel>;
  paginatedResults$: Observable<Array<VisualNovel>>;


  paginateProperties = {
    first: 0,
    rows: 10,
    rowsPerPageOptions: [10, 25, 50]
  }

  constructor(public vndbService: VNDBService, private router: Router) {
    this.vndbService.searchResult$
      .pipe(takeUntilDestroyed())
      .subscribe({
      next: (searchResults: VNResponseType | null) => {
        if (searchResults == null) {
          this.searchResults = [];
          return;
        }

        this.paginatedResults$ = of(searchResults.results).pipe(
          map(data => data.slice(0, this.paginateProperties.rows))
        )

        this.searchResults = searchResults.results;
      }
    })
  }

  ngOnInit() {
    this.searchQuery = '';
    this.searchResultsLoaded = true;

    this.searchResults = [];
  }

  onSearchQueryChange(): void {
    this.searchResultsLoaded = false;
    this.vndbService.updateSearchQuery(this.searchQuery);
  }

  handleClickOutside(): void {
    this.outsideClicked.emit();
  }

  handlePageChange(paginatorState: PaginatorState): void {
    this.paginateProperties.first = paginatorState.first!;
    this.paginateProperties.rows = paginatorState.rows!;

    this.updateNovelsDisplayed();
  }

  updateNovelsDisplayed() {
    this.paginatedResults$ = of(this.searchResults).pipe(
      map(data => data.slice(this.paginateProperties.first, this.paginateProperties.first + this.paginateProperties.rows))
    )
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

  scrollToTop(): void {
    this.resultContainer.nativeElement.scrollTo({ top: 0, behavior: "smooth" });
  }

  protected readonly sortByPopularity = sortByPopularity;
}
