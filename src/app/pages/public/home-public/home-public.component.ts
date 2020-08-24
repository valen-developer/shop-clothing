import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-home-public',
  templateUrl: './home-public.component.html',
  styleUrls: ['./home-public.component.css'],
})
export class HomePublicComponent implements OnInit {
  items: any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    const itemsAux = await this.productsService.getAll();
    itemsAux.forEach((item) => {
      item.ofert === 'true' ? this.items.push(item) : null;
    });
  }
}
