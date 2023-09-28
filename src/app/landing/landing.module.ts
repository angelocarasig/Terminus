import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgIconsModule } from '@ng-icons/core';
import { featherAlertCircle, featherKey, featherLogIn, featherX } from '@ng-icons/feather-icons';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { NgParticlesModule } from 'ng-particles';
import { SpinnerModule } from 'primeng/spinner';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    NgIconsModule.withIcons({ featherKey, featherX, featherLogIn, featherAlertCircle }),
    SharedModule,
    NgParticlesModule,
    SpinnerModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  exports: [
    LandingComponent
  ],
  providers: [
    MessageService
  ]
})
export class LandingModule {
}
