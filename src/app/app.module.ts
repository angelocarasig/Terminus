import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { LandingModule } from './landing/landing.module';
import { BookshelfModule } from './bookshelf/bookshelf.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    // Modules
    SharedModule,
    LandingModule,
    BookshelfModule
  ],
  providers: [{ provide: 'environment', useValue: environment }],
  exports: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
