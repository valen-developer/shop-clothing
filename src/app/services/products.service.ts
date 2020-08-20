import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private urlBase = 'http://localhost:3001/api';
  constructor(private http: HttpClient) {}

  async getShoes(): Promise<any[]> {
    console.log('Entra');
    const params = new HttpParams().set('type', 'shoe');
    const resp: any = await this.http
      .get(`${this.urlBase}/products`, {
        params,
      })
      .toPromise();

    return resp.data;
  }

  async postArticle(article) {
    const formData = new FormData();
    formData.append('name', article.name);
    formData.append('type', article.type);
    formData.append('size', article.size);
    formData.append('size_cm', '43');
    formData.append('price', article.price);
    formData.append('quantity', article.quantity);

    const resp = await this.http
      .post(`${this.urlBase}/products`, formData)
      .toPromise();
    console.log(resp);
  }
}
