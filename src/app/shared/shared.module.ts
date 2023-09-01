import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AutoFocusModule } from 'primeng/autofocus';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { NgIconsModule } from '@ng-icons/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { featherGithub, featherList, featherSearch, featherSettings } from '@ng-icons/feather-icons';
import { IconHeartPlus, IconPlaylistAdd } from 'angular-tabler-icons/icons';

import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { SearchModalComponent } from './components/search-modal/search-modal.component';
import { CommitsModalComponent } from './components/commits-modal/commits-modal.component';

import {NgClickOutsideDirective} from 'ng-click-outside2';
import { HeatmapComponent } from './components/heatmap/heatmap.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    ThemeSwitchComponent,
    IconButtonComponent,
    NavbarComponent,
    SearchModalComponent,
    CommitsModalComponent,
    HeatmapComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgIconsModule.withIcons({ featherSettings, featherSearch, featherList, featherGithub }),
    TablerIconsModule.pick({ IconHeartPlus, IconPlaylistAdd }),
    AutoFocusModule,
    ProgressSpinnerModule,
    NgClickOutsideDirective,
    NgApexchartsModule
  ],
  exports: [
    ThemeSwitchComponent,
    IconButtonComponent,
    NavbarComponent,
  ],
  providers: []
})
export class SharedModule {
}
