import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicComponent } from './public.component';
import { HomePublicComponent } from './home-public/home-public.component';
import { JacketComponent } from './jacket/jacket.component';
import { ShoeComponent } from './shoe/shoe.component';
import { UserComponent } from './user/user.component';

const publicRoutes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: 'home', component: HomePublicComponent },
      { path: 'jacket', component: JacketComponent },
      { path: 'shoe', component: ShoeComponent },
      { path: 'user', component: UserComponent },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(publicRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class PublicRoutingModule {}
