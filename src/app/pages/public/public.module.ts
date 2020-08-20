import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HomePublicComponent } from './home-public/home-public.component';
import { JacketComponent } from './jacket/jacket.component';
import { PublicComponent } from './public.component';
import { CardComponent } from './shared/card/card.component';
import { NavbarPublicComponent } from './shared/navbar-public/navbar-public.component';
import { ShoeComponent } from './shoe/shoe.component';
import { UserComponent } from './user/user.component';

// Routing
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    PublicComponent,
    HomePublicComponent,
    NavbarPublicComponent,
    JacketComponent,
    ShoeComponent,
    UserComponent,
    CardComponent,
  ],
  exports: [
    PublicComponent,
    HomePublicComponent,
    NavbarPublicComponent,
    JacketComponent,
    ShoeComponent,
    UserComponent,
    CardComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
})
export class PublicModule {}
