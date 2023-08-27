// Other Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

// Icons
import { NgIconsModule } from '@ng-icons/core';
import { featherKey, featherX, featherLogIn, featherAlertCircle } from '@ng-icons/feather-icons';

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
    ReactiveFormsModule,
    NgIconsModule.withIcons({ featherKey, featherX, featherLogIn, featherAlertCircle }),
    SharedModule,
  ],
  exports: [
    LandingComponent
  ]
})
export class LandingModule { }
