import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { JacketsComponent } from './dashboard/pages/edit/jackets/jackets.component';
import { ShoesComponent } from './dashboard/pages/edit/shoes/shoes.component';
import { UsersComponent } from './dashboard/pages/edit/users/users.component';

import { HomeComponent } from './dashboard/pages/home/home.component';
import { ProtectedComponent } from './pages/protected.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: ProtectedComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'edit/jackets', component: JacketsComponent },
      { path: 'edit/shoes', component: ShoesComponent },
      { path: 'edit/users', component: UsersComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ],
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
