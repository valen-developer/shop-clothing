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

  get car() {
    return this.itemsCar;
  }

  setProductInCar(product: Product) {
    if (!this.isInCar(product)) {
      this.itemsCar.push(product);
    }

    this.productsController.next(this.itemsCar);
    this.produtsLengthController.next(this.itemsCar.length);
    console.log(this.itemsCar);
  }

  clearCar() {
    this.itemsCar = [];
    this.productsController.next(this.itemsCar);
    this.produtsLengthController.next(this.itemsCar.length);
  }

  private isInCar(product: Product): boolean {
    let returnAux = false;
    this.itemsCar.forEach((item) => {
      if (
        item.product.name === product.product.name &&
        item.size === product.size
      ) {
        item.quantity++;
        returnAux = true;
      }
    });
    return returnAux;
  }
}

interface Product {
  product: any;
  size: string;
  quantity: number;
}
