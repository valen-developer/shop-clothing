import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProtectedRoutingModule } from './pages/protected/protected.routing';
import { PublicRoutingModule } from './pages/public/public.routing';

//Components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CheckRegisterComponent } from './auth/check-register/check-register.component';

const routes: Routes = [
  //path: /dashboard -> protected routing
  //path: / -> public routing

  { path: 'login/:returnPage', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'checkregister/:token', component: CheckRegisterComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ProtectedRoutingModule,
    PublicRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
