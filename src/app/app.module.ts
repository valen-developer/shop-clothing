import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SidebarComponent } from './dashboard/shared/sidebar/sidebar.component';
import { NavbarComponent } from './dashboard/shared/navbar/navbar.component';
import { ShoesComponent } from './dashboard/pages/edit/shoes/shoes.component';
import { JacketsComponent } from './dashboard/pages/edit/jackets/jackets.component';
import { UsersComponent } from './dashboard/pages/edit/users/users.component';
import { UserProfileComponent } from './dashboard/pages/user-profile/user-profile.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { ProtectedComponent } from './pages/protected.component';
import { HomePublicComponent } from './pages/home-public/home-public.component';
import { PublicComponent } from './pages/public.component';
import { NavbarPublicComponent } from './pages/navbar-public/navbar-public.component';
import { JacketComponent } from './pages/jacket/jacket.component';
import { ShoeComponent } from './pages/shoe/shoe.component';
import { UserComponent } from './pages/user/user.component';
import { CardComponent } from './pages/shared/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    NavbarComponent,
    ShoesComponent,
    JacketsComponent,
    UsersComponent,
    UserProfileComponent,
    HomeComponent,
    ProtectedComponent,
    HomePublicComponent,
    PublicComponent,
    NavbarPublicComponent,
    JacketComponent,
    ShoeComponent,
    UserComponent,
    CardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
