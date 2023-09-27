import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconsModule } from '@ng-icons/core';
import { featherEdit2, featherExternalLink, featherMoreVertical, featherRefreshCw } from '@ng-icons/feather-icons';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { SharedModule } from '../shared/shared.module';
import { ProfileModule } from '../profile/profile.module';

import { LibraryComponent } from './components/library/library.component';
import { PageComponent } from './components/page/page.component';

@NgModule({
  declarations: [
    LibraryComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgIconsModule.withIcons({
      featherMoreVertical,
      featherEdit2,
      featherExternalLink,
      featherRefreshCw
    }),
    ProgressSpinnerModule,
    ProfileModule
  ],
  exports: [
    LibraryComponent,
  ]
})
export class LibraryModule {
}
