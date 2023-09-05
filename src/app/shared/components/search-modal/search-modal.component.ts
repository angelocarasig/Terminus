import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { animate, style, transition, trigger } from '@angular/animations';

import { VNDBService } from '../../services/vndb/vndb.service';

import { replaceVNDBDescriptionLink } from '../../helpers/utilities.helper';
import { sortByPopularity } from '../../pipes/novel-sort/novel-sort.helper';
import { VisualNovel } from '../../models/vn/visual-novel';

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

  constructor(public vndbService: VNDBService, private sanitizer: DomSanitizer, private renderer: Renderer2) {
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

  openVNLink(book: VisualNovel): void {
    const url = `https://vndb.org/${book.id}`;
    const link = this.renderer.createElement('a');
    this.renderer.setAttribute(link, 'href', url);
    this.renderer.setAttribute(link, 'target', '_blank');
    link.click();
  }

  protected readonly console = console;
  protected readonly sortByPopularity = sortByPopularity;
}
