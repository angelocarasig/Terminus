import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgIconsModule } from '@ng-icons/core';
import { featherSun, featherMoon } from '@ng-icons/feather-icons';

import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    ThemeSwitchComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgIconsModule.withIcons({ featherSun, featherMoon })
  ],
  exports: [
    ThemeSwitchComponent,
    LoadingComponent
  ],
  providers: []
})
export class SharedModule {
}
