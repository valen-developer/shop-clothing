import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CarService } from './car.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class BuyService {
  private urlBase = 'http://localhost:3001/api';

  constructor(
    private http: HttpClient,
    private carService: CarService,
    private userService: UserService
  ) {}

  async getBuyByUserID(userID) {
    const params = new HttpParams().set('userID', userID);
    const resp: any = await this.http
      .get(`${this.urlBase}/buy/all`, { params })
      .toPromise();

    return resp;
  }

  async getBuyByToken(buyToken) {
    const params = new HttpParams().append('buyToken', buyToken);
    const resp: any = await this.http
      .get(`${this.urlBase}/buy`, { params })
      .toPromise();

    return resp.paypalID;
  }

  async createBuy() {
    const items = this.carService.car;
    const user = this.userService.userLogged;

    const body = {
      items,
      user,
    };

    const resp: any = await this.http
      .post(`${this.urlBase}/buy`, body)
      .toPromise();

    return resp;
  }

  async addBuyID(buyID, buyToken) {
    const body = {
      buyID,
      buyToken,
    };

    const resp: any = await this.http
      .put(`${this.urlBase}/buy/paypalID`, body)
      .toPromise();

    return resp;
  }
}
