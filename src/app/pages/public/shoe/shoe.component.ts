import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../services/products.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-shoe',
  templateUrl: './shoe.component.html',
  styleUrls: ['./shoe.component.css'],
})
export class ShoeComponent implements OnInit {
  shoes: any[] = [];

  constructor(
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.getShoes();
  }


  async getShoes() {
    this.shoes = await this.productsService.getShoes();
  }
}
