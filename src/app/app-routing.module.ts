import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserGuard } from './shared/guards/user/userGuard';

import { LandingComponent } from './landing/landing/landing.component';
import { BookshelfComponent } from './bookshelf/bookshelf/bookshelf.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'bookshelf', component: BookshelfComponent, canActivate: [UserGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
