import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgIconsModule } from '@ng-icons/core';
import { featherGithub, featherList, featherSearch, featherSettings } from '@ng-icons/feather-icons';

import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { IconButtonComponent } from './components/icon-button/icon-button/icon-button.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { SearchModalComponent } from './components/search-modal/search-modal.component';
import { CommitsModalComponent } from './components/commits-modal/commits-modal.component';

import {NgClickOutsideDirective} from 'ng-click-outside2';

@NgModule({
  declarations: [
    ThemeSwitchComponent,
    IconButtonComponent,
    NavbarComponent,
    SearchModalComponent,
    CommitsModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgIconsModule.withIcons({ featherSettings, featherSearch, featherList, featherGithub }),
    ProgressSpinnerModule,
    NgClickOutsideDirective,
  ],
  exports: [
    ThemeSwitchComponent,
    IconButtonComponent,
    NavbarComponent
  ],
  providers: []
})
export class SharedModule {
}
