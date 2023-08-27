import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DividerModule } from 'primeng/divider';
import { NgIconsModule } from '@ng-icons/core';
import { featherSearch, featherSettings } from '@ng-icons/feather-icons';

import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { LoadingComponent } from './components/loading/loading.component';
import { IconButtonComponent } from './components/icon-button/icon-button/icon-button.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { SearchModalComponent } from './components/search-modal/search-modal/search-modal.component';

import {NgClickOutsideDirective} from 'ng-click-outside2';
@NgModule({
  declarations: [
    ThemeSwitchComponent,
    LoadingComponent,
    IconButtonComponent,
    NavbarComponent,
    SearchModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgIconsModule.withIcons({ featherSettings, featherSearch }),
    DividerModule,
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
