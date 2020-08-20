import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { ProtectedComponent } from './pages/protected/protected.component';
import { ShoesComponent } from './pages/protected/dashboard/pages/edit/shoes/shoes.component';
import { UsersComponent } from './pages/protected/dashboard/pages/edit/users/users.component';
import { HomeComponent } from './pages/protected/dashboard/pages/home/home.component';

import { PublicComponent } from './pages/public/public.component';
import { HomePublicComponent } from './pages/public/home-public/home-public.component';
import { JacketComponent } from './pages/public/jacket/jacket.component';
import { ShoeComponent } from './pages/public/shoe/shoe.component';
import { UserComponent } from './pages/public/user/user.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: ProtectedComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'edit/shoes', component: ShoesComponent },
      { path: 'edit/users', component: UsersComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
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
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
