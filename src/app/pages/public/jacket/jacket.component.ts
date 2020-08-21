import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-jacket',
  templateUrl: './jacket.component.html',
  styleUrls: ['./jacket.component.css'],
})
export class JacketComponent implements OnInit {
  jackets: any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getJackets();
  }

  async getJackets() {
    this.jackets = await this.productsService.getJackets();
  }
}
