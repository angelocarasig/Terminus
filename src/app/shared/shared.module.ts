import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconsModule } from '@ng-icons/core';
import { featherSun, featherMoon } from '@ng-icons/feather-icons';

import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    ThemeSwitchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgIconsModule.withIcons({ featherSun, featherMoon })
  ],
  exports: [
    ThemeSwitchComponent
  ],
  providers: []
})
export class SharedModule { }
