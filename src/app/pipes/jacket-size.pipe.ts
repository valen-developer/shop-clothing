import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jacketSize',
})
export class JacketSizePipe implements PipeTransform {
  transform(index: number): string {
    
    switch (index) {
      case 0:
        return 'Small';

      case 1:
        return 'Medium';
      case 2:
        return 'Large';
      case 3:
        return 'ExtraLarge';

      default:
        return 'Sin talla';
    }
  }
}
