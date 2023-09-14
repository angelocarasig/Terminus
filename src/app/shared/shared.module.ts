import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AutoFocusModule } from 'primeng/autofocus';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { NgIconsModule } from '@ng-icons/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { featherGithub, featherHome, featherList, featherLogOut, featherMenu, featherSearch, featherSettings, featherX } from '@ng-icons/feather-icons';
import { IconHeartPlus, IconPlaylistAdd } from 'angular-tabler-icons/icons';

import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchModalComponent } from './components/search-modal/search-modal.component';
import { CommitsModalComponent } from './components/commits-modal/commits-modal.component';

import { NgClickOutsideDirective } from 'ng-click-outside2';
import { HeatmapComponent } from './components/heatmap/heatmap.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MemoizePipe } from './pipes/memoize/memoize.pipe';
import { OptionsModalComponent } from './components/options-modal/options-modal.component';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { NovelFilterPipe } from './pipes/novel-filter/novel-filter.pipe';
import { NovelSortPipe } from './pipes/novel-sort/novel-sort.pipe';
import { HighestVotePipe } from './pipes/highest-vote/highest-vote.pipe';
import { BookImageComponent } from './components/book-image/book-image.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    // Components
    ThemeSwitchComponent,
    IconButtonComponent,
    NavbarComponent,
    SearchModalComponent,
    CommitsModalComponent,
    HeatmapComponent,
    OptionsModalComponent,
    BookImageComponent,

    // Pipes
    MemoizePipe,
    NovelFilterPipe,
    NovelSortPipe,
    HighestVotePipe
  ],
  imports: [
    // Angular Modules
    CommonModule,
    HttpClientModule,
    FormsModule,

    // Icon Modules
    NgIconsModule.withIcons({ featherSettings, featherSearch, featherList, featherGithub, featherHome, featherLogOut, featherMenu, featherX }),
    TablerIconsModule.pick({ IconHeartPlus, IconPlaylistAdd }),

    // External NPM Modules
    NgClickOutsideDirective,
    ProgressSpinnerModule,
    AutoFocusModule,
    NgApexchartsModule,
    ToastModule,
    MenuModule,
    SkeletonModule,
    ConfirmDialogModule,
    NgOptimizedImage,
    TooltipModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  exports: [
    // Shared Components
    ThemeSwitchComponent,
    IconButtonComponent,
    NavbarComponent,

    // Pipes
    MemoizePipe,
    NovelFilterPipe,
    NovelSortPipe,
    HighestVotePipe,
    BookImageComponent
  ],
  providers: [ConfirmationService]
})
export class SharedModule {
}
