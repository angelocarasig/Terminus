import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CarouselModule} from 'primeng/carousel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgIconsModule } from '@ng-icons/core';
import { featherMoreVertical, featherEdit2, featherLink, } from '@ng-icons/feather-icons';

import { SharedModule } from '../shared/shared.module';

import { BookshelfComponent } from './bookshelf/bookshelf.component';
import { BookComponent } from './book/book.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    BookshelfComponent,
    BookComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    SharedModule,
    NgIconsModule.withIcons({ featherMoreVertical, featherEdit2, featherLink }),
    ProgressSpinnerModule
  ],
  exports: [
    BookshelfComponent
  ]
})
export class BookshelfModule { }
