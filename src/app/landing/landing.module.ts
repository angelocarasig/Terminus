// Other Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// Icons
import { NgIconsModule } from '@ng-icons/core';
import { featherKey, featherX, featherLogIn } from '@ng-icons/feather-icons';

// Components
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    NgIconsModule.withIcons({ featherKey, featherX, featherLogIn }),
    SharedModule
  ],
  exports: [
    LandingComponent
  ]
})
export class LandingModule { }
