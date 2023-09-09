import { Component, Input, Renderer2 } from '@angular/core';
import { UserNovel } from '../../../shared/models/vn/user-novel';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  @Input() book: UserNovel;
  imageLoaded: boolean = false;

  constructor(private renderer: Renderer2) {  }

  printBook(): void {
    console.log(this.book);
  }

  openVNLink(): void {
    const url = `https://vndb.org/${this.book.id}`;
    const link = this.renderer.createElement('a');
    this.renderer.setAttribute(link, 'href', url);
    this.renderer.setAttribute(link, 'target', '_blank');
    link.click();
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
}
