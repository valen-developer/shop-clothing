import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  produtsLengthController: BehaviorSubject<number>;
  productsController: BehaviorSubject<Product[]>;
  private itemsCar: Product[] = [];

  constructor() {
    this.productsController = new BehaviorSubject(this.itemsCar);
    this.produtsLengthController = new BehaviorSubject(this.itemsCar.length);
  }

  setProductInCar(product) {
    this.itemsCar.push(product);
    this.productsController.next(this.itemsCar);
    this.produtsLengthController.next(this.itemsCar.length);
    console.log(this.itemsCar);
  }

  clearCar() {
    this.itemsCar = [];
    this.productsController.next(this.itemsCar);
    this.produtsLengthController.next(this.itemsCar.length);
  }
}

interface Product {
  product: any;
  size: string;
  quantity: number;
}
