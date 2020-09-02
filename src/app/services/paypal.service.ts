import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';

import { paypal } from '../secrets/paypal.secret';

@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  private urlBase = 'https://api.sandbox.paypal.com';

  private credentials = {
    clientId: paypal.clientID,
    clientSecret: paypal.clientSecret,
    sandboxAccount: paypal.sandboxAccount,
  };

  private token = '';

  constructor(private http: HttpClient) {
    this.getAccessToken();
  }

  private async getAccessToken() {
    const urlBase = 'https://api.sandbox.paypal.com/v1/oauth2/token';

    const form = { grant_type: 'client_credentials' };
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Accept-Language', 'es_ES')
      .set('content-type', 'application/x-www-form-urlencoded')
      .set(
        'Authorization',
        `Basic ` +
          btoa(`${this.credentials.clientId}:${this.credentials.clientSecret}`)
      );

    const resp: any = await this.http
      .post(urlBase, form, {
        headers,
        params: {
          grant_type: 'client_credentials',
        },
      })
      .toPromise();

    this.token = resp.access_token;
  }

  async createOrder(value: number) {
    console.log(this.token);
    console.log(btoa(this.token));
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.token)
      .set('Content-Type', 'application/json')
      .set('Prefer', 'return=representation');

    const requestBody = {
      intent: 'AUTHORIZE',
      purchase_units: [{ amount: { currency_code: 'EUR', value: value } }],
      application_context: {
        return_url: 'http://localhost:3000/',
        cancel_url: 'http://localhost:3000',
        user_action: 'PAY_NOW',
        payment_method: { card: 'VISA' },
      },
    };

    const resp: any = await this.http
      .post(`${this.urlBase}/v2/checkout/orders`, requestBody, { headers })
      .toPromise();

    window.open(resp.links[1].href);
  }

  async showDetailsOrder() {
    const idorder = '5R246860WE699271W';
    const url = `${this.urlBase}/v2/checkout/orders/${idorder}`;

    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.token)
      .set('Content-Type', 'application/json');

    const resp: any = await this.http.get(url, { headers }).toPromise();
    console.log(resp);
  }
}
