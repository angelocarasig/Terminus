import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { openUrlInNewTab } from '../../helpers/utilities.helper';

import { UserNovel } from '../../models/vn/user-novel';

@Component({
  selector: 'shared-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  @Input() book: UserNovel;
  imageLoaded: boolean = false;

  constructor(private router: Router) {
  }

  openBook(): void {
    this.printBook();

    this.router.navigate(['/vn'], { state: { novel: this.book } });
  }

  printBook(): void {
    console.log(this.book);
  }

  openVNLink(): void {
    openUrlInNewTab(`https://vndb.org/${this.book.id}`);
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
}
