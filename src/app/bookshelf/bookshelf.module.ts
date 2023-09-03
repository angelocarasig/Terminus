import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconsModule } from '@ng-icons/core';
import { featherMoreVertical, featherEdit2, featherLink, featherRefreshCw } from '@ng-icons/feather-icons';


import { NgxPaginationModule } from 'ngx-pagination';

// PrimeNG
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import {ChartModule} from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { SharedModule } from '../shared/shared.module';

import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { BookComponent } from './components/book/book.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileNovelContainerComponent } from './components/profile-novel-container/profile-novel-container.component';

@NgModule({
  declarations: [
    BookshelfComponent,
    BookComponent,
    ProfileComponent,
    ProfileNovelContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgIconsModule.withIcons({ featherMoreVertical, featherEdit2, featherLink, featherRefreshCw }),
    ProgressSpinnerModule,
    ChartModule,
    TableModule,
    PaginatorModule,
    NgxPaginationModule
  ],
  exports: [
    BookshelfComponent
  ]
})
export class BookshelfModule { }
