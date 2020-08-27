import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SizesService {
  private urlBase = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}


  async getSizes(id) {
    const params = new HttpParams().set('id', id);
    const resp: any = await this.http
      .get(`${this.urlBase}/sizes`, { params })
      .toPromise();
    return resp;
  }
}
