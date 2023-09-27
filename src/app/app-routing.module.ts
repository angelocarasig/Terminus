import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserGuard } from './shared/guards/user/user.guard';

import { LandingComponent } from './landing/components/landing/landing.component';
import { LibraryComponent } from './library/components/library/library.component';
import { PageComponent } from './library/components/page/page.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'library', component: LibraryComponent, canActivate: [UserGuard] },
  { path: 'vn', component: PageComponent, canActivate: [UserGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
