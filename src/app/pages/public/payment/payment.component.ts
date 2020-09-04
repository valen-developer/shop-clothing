import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BuyService } from '../../../services/buy.service';
import { PaypalService } from 'src/app/services/paypal.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  private buyToken = '';
  private amount = '';
  private userID = '';
  private success = false;
  approved = false;
  buystate: string = '';

  constructor(
    private route: ActivatedRoute,
    private buyService: BuyService,
    private paypal: PaypalService,
    private paymentService: PaymentService,
    private router: Router
  ) {
    this.route.queryParams.forEach((param) => {
      this.buyToken = param.buytoken;
      this.success = param.confirm;
      this.userID = param.id;
      this.amount = param.value;
    });

    this.checkBuy();
  }

  ngOnInit(): void {}

  private async checkBuy() {
    const paypalBuyID = await this.buyService.getBuyByToken(this.buyToken);
    console.log(paypalBuyID);
    const dataPaypal: any = await this.paypal.showDetailsOrder(paypalBuyID);
    try {
      const dataPayment: any = await this.paymentService.createPayment(
        this.userID,
        this.amount,
        dataPaypal.resp.status,
        this.buyToken,
        paypalBuyID
      );

      console.log(dataPayment);

      if (dataPaypal.resp.status === 'APPROVED') {
        this.approved = true;
        this.buystate = 'approved'
        setTimeout(() => {
          this.router.navigate(['/user']);
        }, 2000);
      }
    } catch (error) {
      this.success = false;
      this.buystate = 'failed';
    }
  }
}

// APPROVED
