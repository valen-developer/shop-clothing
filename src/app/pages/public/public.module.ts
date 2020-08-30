import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Custom Modules
import { ComponentsModule } from '../../components/components.module';

// Components
import { HomePublicComponent } from './home-public/home-public.component';
import { JacketComponent } from './jacket/jacket.component';
import { PublicComponent } from './public.component';
import { CardComponent } from './shared/card/card.component';
import { NavbarPublicComponent } from './shared/navbar-public/navbar-public.component';
import { ShoeComponent } from './shoe/shoe.component';
import { UserComponent } from './user/user.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CarComponent } from './car/car.component';

// Pipes
import { CheckOfertPipe } from '../../pipes/check-ofert.pipe';

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
    ProductPageComponent,
    CarComponent,
    CheckOfertPipe,
  ],
  exports: [
    PublicComponent,
    HomePublicComponent,
    NavbarPublicComponent,
    JacketComponent,
    ShoeComponent,
    UserComponent,
    CardComponent,
    ProductPageComponent,
    CarComponent,
    CheckOfertPipe,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
  ],
})
export class PublicModule {}
