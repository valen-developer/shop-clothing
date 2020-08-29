import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesService } from './images.service';
import { ProductsService } from './products.service';
import { SizesService } from './sizes.service';
import { UserService } from './user.service';
import { CarService } from "./car.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ImagesService, ProductsService, SizesService, UserService, CarService],
})
export class ServicesModule {}
