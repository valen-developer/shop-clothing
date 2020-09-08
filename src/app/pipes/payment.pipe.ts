import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payment',
})
export class PaymentPipe implements PipeTransform {
  transform(paymentState: string): string {
    switch (paymentState) {
      case 'APPROVED':
        return 'APROBADO';

      default:
        return 'PENDIENTE';
    }
  }
}
