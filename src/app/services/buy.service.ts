import { HttpClient } from '@angular/common/http';
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
}
