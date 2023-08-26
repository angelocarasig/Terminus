import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgIconsModule } from '@ng-icons/core';
import { featherSun, featherMoon } from '@ng-icons/feather-icons';

import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { LoadingComponent } from './components/loading/loading.component';
import { IconButtonComponent } from './components/icon-button/icon-button/icon-button.component';

@NgModule({
  declarations: [
    ThemeSwitchComponent,
    LoadingComponent,
    IconButtonComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgIconsModule.withIcons({ featherSun, featherMoon })
  ],
  exports: [
    ThemeSwitchComponent,
    LoadingComponent,
    IconButtonComponent
  ],
  providers: []
})
export class SharedModule {
}
