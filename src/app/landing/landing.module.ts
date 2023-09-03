import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgIconsModule } from '@ng-icons/core';
import { featherKey, featherX, featherLogIn, featherAlertCircle } from '@ng-icons/feather-icons';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { NgParticlesModule } from 'ng-particles';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({ featherKey, featherX, featherLogIn, featherAlertCircle }),
    SharedModule,
    NgParticlesModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [
    LandingComponent
  ]
})
export class LandingModule {
}
