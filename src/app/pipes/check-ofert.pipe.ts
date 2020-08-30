import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkOfert',
})
export class CheckOfertPipe implements PipeTransform {
  transform(product): number {
    if (product.product.ofert === true) {
      return product.product.ofert_price;
    } else {
      return product.product.price;
    }
  }
}
