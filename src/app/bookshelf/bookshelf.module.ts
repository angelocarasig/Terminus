import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookshelfComponent } from './bookshelf/bookshelf.component';

@NgModule({
  declarations: [
    BookshelfComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BookshelfComponent
  ]
})
export class BookshelfModule { }
