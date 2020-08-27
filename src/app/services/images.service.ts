import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private urlBase = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  //Images
  async getImagesById(id) {
    const params = new HttpParams().set('id', id);

    const resp: any = await this.http
      .get(`${this.urlBase}/images`, {
        params,
      })
      .toPromise();

    return resp;
  }
}
