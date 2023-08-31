import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AutoFocusModule } from 'primeng/autofocus';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { NgIconsModule } from '@ng-icons/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { featherGithub, featherList, featherSearch, featherSettings } from '@ng-icons/feather-icons';
import { IconHeartPlus } from 'angular-tabler-icons/icons';


import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { SearchModalComponent } from './components/search-modal/search-modal.component';
import { CommitsModalComponent } from './components/commits-modal/commits-modal.component';

import {NgClickOutsideDirective} from 'ng-click-outside2';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
    NgIconsModule.withIcons({ featherSettings, featherSearch, featherList, featherGithub }),
    TablerIconsModule.pick({ IconHeartPlus }),
    AutoFocusModule,
    ProgressSpinnerModule,
    NgClickOutsideDirective,
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
