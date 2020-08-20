import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShoeService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  async getShoes() {
    const params = new HttpParams().set('type', 'shoe');

    const resp: any = await this.http
      .get(`${this.baseUrl}/api/products`, {
        params,
      })
      .toPromise();

    const data = Array.from(resp.data);
    return data;
  }
}
