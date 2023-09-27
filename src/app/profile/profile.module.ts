import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { PieComponent } from './components/pie/pie.component';
import { HeatmapComponent } from './components/heatmap/heatmap.component';
import { StatsComponent } from './components/stats/stats.component';

import { SharedModule } from '../shared/shared.module';
import { BookContainerComponent } from './components/book-container/book-container.component';
import { ChartModule } from 'primeng/chart';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    ProfileComponent,
    PieComponent,
    HeatmapComponent,
    HeatmapComponent,
    StatsComponent,
    BookContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,

    ChartModule,
    PaginatorModule,
    TooltipModule,
  ],
  exports: [
    ProfileComponent,
  ]
})
export class ProfileModule { }
