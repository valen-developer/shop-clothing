import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

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

  constructor(private carService: CarService) {
    this.carService.productsController.subscribe((data) => {
      this.items = data;
      this.setTotal();
    });
  }

  ngOnInit(): void {}

  private setTotal() {
    this.subtotal = 0;
    this.total = 0;

    this.items.forEach((item) => {
      console.log(item);
      let priceForItem = 0;
      if (item.product.ofert === true) priceForItem = item.product.ofert_price;
      else priceForItem = item.product.price;

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
