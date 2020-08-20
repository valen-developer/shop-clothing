import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ProtectedComponent } from './protected.component';
import { ShoesComponent } from './dashboard/pages/edit/shoes/shoes.component';
import { UsersComponent } from './dashboard/pages/edit/users/users.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { UserProfileComponent } from './dashboard/pages/user-profile/user-profile.component';

const protectedRoutes: Routes = [
  {
    path: 'dashboard',
    component: ProtectedComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'userprofile', component: UserProfileComponent },
      { path: 'edit/shoes', component: ShoesComponent },
      { path: 'edit/users', component: UsersComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(protectedRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class ProtectedRoutingModule {}
