import { Component, Input } from '@angular/core';
import { UserNovel } from '../../../shared/models/user-novel/user-novel';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  @Input() book: UserNovel;

  constructor() {  }

  printBook(): void {
    console.log(this.book);
  }
}
