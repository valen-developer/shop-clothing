import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuyService } from 'src/app/services/buy.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User;
  arraybuys: BuyObject[] = [];
  payments: Payment[] = [];

  constructor(
    private buyService: BuyService,
    private userService: UserService,
    private paymentService: PaymentService,
    private router: Router
  ) {
    this.setAllData();
  }

  ngOnInit(): void {}

  private async setAllData() {
    await this.getUser();
    await this.getPayments();
    await this.getBuys();
  }

  private async getUser() {
    const logged = await this.userService.verifyLogged();
    if (logged.ok) {
      this.user = logged.user;
      return true;
    } else this.router.navigate(['/login']);
    return false;
  }

  private async getPayments() {
    const dataDB: any = await this.paymentService.getPaymentsByUserID(
      this.user.id
    );
    const paymenstArrayDB = Array.from(dataDB.response.data);
    this.setArrayPayments(paymenstArrayDB);
  }

  private async getBuys() {
    const dataDB = await this.buyService.getBuyByUserID(this.user.id);
    const buyFromDB = Array.from(dataDB.data);
    this.setArrayBuys(buyFromDB);
  }

  private convertBuy(buy): Buy {
    const newBuy: Buy = {
      buyToken: buy.buy_token,
      date: buy.date,
      paypalID: buy.paypal_id,
      productID: buy.product_id,
      quantity: buy.quantity,
      send: buy.send,
      size: buy.size,
    };
    return newBuy;
  }

  private setArrayPayments(paymentArrayDB: any[]) {
    paymentArrayDB.forEach((payment) => {
      const paymentAux: Payment = {
        amount: payment.amount,
        buyToken: payment.buy_token,
        id: payment.id,
        paypalID: payment.paypal_id,
        state: payment.state,
      };
      this.payments.push(paymentAux);
    });
  }

  private setArrayBuys(buyFromDB) {
    buyFromDB.forEach((buy) => {
      const newBuy: Buy = this.convertBuy(buy);
      let flag = false;

      this.arraybuys.forEach((arrayObject) => {
        if (arrayObject.date === newBuy.date) {
          arrayObject.buys.push(newBuy);
          flag = true;
        }
      });
      if (!flag)
        this.arraybuys.push({
          date: newBuy.date,
          paypalID: newBuy.paypalID,
          buys: [newBuy],
        });
    });
  }
}

interface User {
  addr: string;
  email: string;
  name: string;
  id: number;
}

interface Buy {
  buyToken: string;
  date: Date;
  paypalID: number;
  productID: number;
  quantity: number;
  send: boolean;
  size: string;
}

interface BuyObject {
  date: Date;
  paypalID: number;
  buys: Buy[];
}

interface Payment {
  amount: number;
  buyToken: string;
  id: number;
  paypalID: number;
  state: string;
}
