import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../services/products.service';
import { UserService } from 'src/app/services/user.service';

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
    const itemsAux: any[] = (await this.productsService.getAll()).product;
    console.log(itemsAux);
    itemsAux.forEach((item) => {
      item.ofert === 'true' ? this.items.push(item) : null;
    });
  }
}
