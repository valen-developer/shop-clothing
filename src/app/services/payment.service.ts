import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private urlBase = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  async getPaymentsByUserID(userID) {
    const params = new HttpParams().set('userID', userID);
    const resp = await this.http
      .get(`${this.urlBase}/payment`, { params })
      .toPromise();

    return resp;
  }

  async createPayment(userID, paymentAmount, state, buyToken, paypalID) {
    const url = `${this.urlBase}/payment`;

    const body = {
      userID,
      paymentAmount,
      state,
      buyToken,
      paypalID,
    };

    const resp: any = await this.http.post(url, body).toPromise();

    return resp;
  }
}
