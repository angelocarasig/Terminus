import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconsModule } from '@ng-icons/core';
import { featherMoreVertical, featherEdit2, featherLink,  } from '@ng-icons/feather-icons';

import { SharedModule } from '../shared/shared.module';

import { BookshelfComponent } from './bookshelf/bookshelf.component';
import { BookComponent } from './book/book.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    BookshelfComponent,
    BookComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgIconsModule.withIcons({ featherMoreVertical, featherEdit2, featherLink }),
    ProgressSpinnerModule
  ],
  exports: [
    BookshelfComponent
  ]
})
export class BookshelfModule { }
