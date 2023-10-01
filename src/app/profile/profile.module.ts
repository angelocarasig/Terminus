import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { PieComponent } from './components/pie/pie.component';
import { HeatmapComponent } from './components/heatmap/heatmap.component';
import { StatsComponent } from './components/stats/stats.component';

import { NgIconsModule } from '@ng-icons/core';
import { featherGrid, featherMenu, featherMoreVertical } from '@ng-icons/feather-icons';

import { SharedModule } from '../shared/shared.module';
import { BookContainerComponent } from './components/book-container/book-container.component';
import { ChartModule } from 'primeng/chart';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SliderModule } from 'primeng/slider';
import { OverlayPanelModule } from 'primeng/overlaypanel';

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

    NgIconsModule.withIcons({
      featherGrid,
      featherMenu,
      featherMoreVertical
    }),

    ChartModule,
    PaginatorModule,
    TooltipModule,
    ToastModule,
    SliderModule,
    OverlayPanelModule
  ],
  exports: [
    ProfileComponent,
  ],
  providers: [
    MessageService
  ]
})
export class ProfileModule { }
