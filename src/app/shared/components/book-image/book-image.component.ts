import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-image',
  templateUrl: './book-image.component.html',
  styleUrls: ['./book-image.component.scss']
})
export class BookImageComponent {
  @Input() imageSource: string;
  @Input() styleClass: string;

  imageLoaded = false;

  onImageLoad(): void {
    this.imageLoaded = true;
  }
}
