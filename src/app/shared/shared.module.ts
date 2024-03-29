import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { NgIconsModule } from '@ng-icons/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  featherBookOpen,
  featherGithub,
  featherHeart,
  featherHome,
  featherList,
  featherLogOut,
  featherMenu,
  featherSearch,
  featherSettings,
  featherStar,
  featherX
} from '@ng-icons/feather-icons';
import { IconHeartPlus, IconPlaylistAdd } from 'angular-tabler-icons/icons';

import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchModalComponent } from './components/search-modal/search-modal.component';
import { CommitsModalComponent } from './components/commits-modal/commits-modal.component';

import { NgClickOutsideDirective } from 'ng-click-outside2';
import { OptionsModalComponent } from './components/options-modal/options-modal.component';
import { BookImageComponent } from './components/book-image/book-image.component';

import { MemoizePipe } from './pipes/memoize/memoize.pipe';
import { NovelFilterPipe } from './pipes/novel-filter/novel-filter.pipe';
import { NovelSortPipe } from './pipes/novel-sort/novel-sort.pipe';
import { HighestVotePipe } from './pipes/highest-vote/highest-vote.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BookComponent } from './components/book/book.component';
import { PaginatorModule } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [
    // Components
    ThemeSwitchComponent,
    IconButtonComponent,
    NavbarComponent,
    SearchModalComponent,
    CommitsModalComponent,
    OptionsModalComponent,
    BookImageComponent,
    BookComponent,

    // Pipes
    MemoizePipe,
    NovelFilterPipe,
    NovelSortPipe,
    HighestVotePipe,
    SidebarComponent
  ],
  imports: [
    // Angular Modules
    CommonModule,
    HttpClientModule,
    FormsModule,

    // Icon Modules
    NgIconsModule.withIcons({
      featherSettings,
      featherSearch,
      featherList,
      featherGithub,
      featherHome,
      featherLogOut,
      featherMenu,
      featherX,
      featherBookOpen,
      featherStar,
      featherHeart
    }),
    TablerIconsModule.pick({ IconHeartPlus, IconPlaylistAdd }),

    // External NPM Modules
    NgClickOutsideDirective,
    ProgressSpinnerModule,
    AutoFocusModule,
    ToastModule,
    MenuModule,
    SkeletonModule,
    ConfirmDialogModule,
    NgOptimizedImage,
    TooltipModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    SidebarModule,
    ToastModule,
    PaginatorModule,
    SelectButtonModule
  ],
  exports: [
    // Shared Components
    ThemeSwitchComponent,
    IconButtonComponent,
    NavbarComponent,
    BookComponent,

    // Pipes
    MemoizePipe,
    NovelFilterPipe,
    NovelSortPipe,
    HighestVotePipe,
    BookImageComponent
  ],
  providers: [ConfirmationService, MessageService]
})
export class SharedModule {
}
