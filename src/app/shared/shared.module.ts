import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconsModule } from '@ng-icons/core';
import { featherSun, featherMoon } from '@ng-icons/feather-icons';

import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';

@NgModule({
  declarations: [
    ThemeSwitchComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ featherSun, featherMoon })
  ],
  exports: [
    ThemeSwitchComponent
  ]
})
export class SharedModule { }
