import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgIconsModule } from '@ng-icons/core';
import { featherList, featherSearch, featherSettings } from '@ng-icons/feather-icons';

import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { LoadingComponent } from './components/loading/loading.component';
import { IconButtonComponent } from './components/icon-button/icon-button/icon-button.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { SearchModalComponent } from './components/search-modal/search-modal/search-modal.component';

import {NgClickOutsideDirective} from 'ng-click-outside2';
import { CommitsModalComponent } from './components/commits-modal/commits-modal.component';
@NgModule({
  declarations: [
    ThemeSwitchComponent,
    LoadingComponent,
    IconButtonComponent,
    NavbarComponent,
    SearchModalComponent,
    CommitsModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgIconsModule.withIcons({ featherSettings, featherSearch, featherList }),
    ProgressSpinnerModule,
    NgClickOutsideDirective,
  ],
  exports: [
    ThemeSwitchComponent,
    LoadingComponent,
    IconButtonComponent,
    NavbarComponent
  ],
  providers: []
})
export class SharedModule {
}
