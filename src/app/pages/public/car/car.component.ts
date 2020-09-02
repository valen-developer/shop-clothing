import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { PaypalService } from 'src/app/services/paypal.service';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  items: Product[] = [];
  subtotal: number = 0;
  total: number = 0;
  shippingCost: number = 3.95;
  paypalUrl: string = 'http://localhost:3000';

  constructor(
    private carService: CarService,
    private paypal: PaypalService,
    private sanitizer: DomSanitizer
  ) {
    this.carService.productsController.subscribe((data) => {
      this.items = data;
      this.setTotal();
    });
  }

  get getPaypalUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.paypalUrl);
  }

  ngOnInit(): void {}

  async makeOrder() {
    if (this.items.length > 0) this.paypal.createOrder(this.total);
  }

  private setTotal() {
    this.subtotal = 0;
    this.total = 0;

    this.items.forEach((item) => {
      let priceForItem = 0;
      if (item.product.ofert === true) priceForItem = item.product.ofert_price;
      else priceForItem = item.product.price;

      priceForItem *= item.quantity;

      this.subtotal += priceForItem;
    });

    this.total = this.subtotal + this.shippingCost;
  }
}

interface Product {
  product: any;
  size: string;
  quantity: number;
}
