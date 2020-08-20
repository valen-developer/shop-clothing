import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProtectedRoutingModule } from './pages/protected/protected.routing';
import { PublicRoutingModule } from './pages/public/public.routing';

//Components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
