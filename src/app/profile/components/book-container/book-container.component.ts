import { Component, Input, OnInit } from '@angular/core';

import { PaginatorState } from 'primeng/paginator';

import { UserNovel } from '../../../shared/models/vn/user-novel';

@Component({
  selector: 'profile-book-container',
  templateUrl: './book-container.component.html',
  styleUrls: ['./book-container.component.scss']
})
export class BookContainerComponent implements OnInit {
  @Input() title: string;
  @Input() novels: Array<UserNovel> | null;
  @Input() novelScale: number;

  visibleNovels: Array<UserNovel>;
  rowsPerPageOptions: Array<number> = [10, 25, 50];

  first = 0;
  rows = 10;

  ngOnInit(): void {
    this.visibleNovels = this.novels!;
    this.updateNovelsDisplayed();
  }

  handlePageChange(paginatorState: PaginatorState): void {
    this.first = paginatorState.first!;
    this.rows = paginatorState.rows!;

    this.updateNovelsDisplayed();
  }

  updateNovelsDisplayed() {
    this.visibleNovels = this.novels!.slice(this.first, this.first + this.rows);
  }

  setNovelScale(): string {
    return `scale(${this.novelScale})`;
  }

  setNovelWidth(): number {
    return this.novelScale * 15;
  }

  setNovelHeight(): number {
    return this.novelScale * 20;
  }

  getGapFromScale(): string {
    return `${this.novelScale * 6.9}rem ${this.novelScale * 3}rem`;
  }

  getMarginTop(): string {
    return `${this.novelScale * 2.5}rem`;
  }
}
