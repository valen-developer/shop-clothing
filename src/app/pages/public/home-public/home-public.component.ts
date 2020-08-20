import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-home-public',
  templateUrl: './home-public.component.html',
  styleUrls: ['./home-public.component.css'],
})
export class HomePublicComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}

  getShoes() {
    this.productsService.getShoes();
  }
}
