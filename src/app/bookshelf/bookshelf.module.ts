import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookshelfComponent } from './bookshelf/bookshelf.component';
import { BookComponent } from './book/book.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BookshelfComponent,
    BookComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    BookshelfComponent
  ]
})
export class BookshelfModule { }
