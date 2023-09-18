import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { NgIconsModule } from '@ng-icons/core';
import { featherEdit2, featherExternalLink, featherMoreVertical, featherRefreshCw } from '@ng-icons/feather-icons';

import { NgxPaginationModule } from 'ngx-pagination';

import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';

import { SharedModule } from '../shared/shared.module';

import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { BookComponent } from './components/book/book.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileNovelContainerComponent } from './components/profile-novel-container/profile-novel-container.component';
import { OpenBookComponent } from './components/open-book/open-book.component';
import { TooltipModule } from 'primeng/tooltip';
import { ProfilePieGraphsComponent } from './components/profile-pie-graphs/profile-pie-graphs.component';
import { NgChartsModule } from 'ng2-charts';
import { ProfileHeatmapGraphsComponent } from './components/profile-heatmap-graphs/profile-heatmap-graphs.component';
import { ProfileStatsGraphsComponent } from './components/profile-stats-graphs/profile-stats-graphs.component';

@NgModule({
  declarations: [
    BookshelfComponent,
    BookComponent,
    ProfileComponent,
    ProfileNovelContainerComponent,
    OpenBookComponent,
    ProfilePieGraphsComponent,
    ProfileHeatmapGraphsComponent,
    ProfileHeatmapGraphsComponent,
    ProfileStatsGraphsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgIconsModule.withIcons({
      featherMoreVertical,
      featherEdit2,
      featherExternalLink,
      featherRefreshCw
    }),
    ProgressSpinnerModule,
    ChartModule,
    TableModule,
    PaginatorModule,
    NgxPaginationModule,
    SkeletonModule,
    NgOptimizedImage,
    TooltipModule,
    NgChartsModule
  ],
  exports: [
    BookshelfComponent
  ]
})
export class BookshelfModule {
}
