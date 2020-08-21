import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private urlBase = 'http://localhost:3001/api';
  constructor(private http: HttpClient) {}

  async getAll() {
    const resp: any = await this.http
      .get(`${this.urlBase}/products/all`)
      .toPromise();
    return resp.data.data;
  }

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

  async postArticle(article, file) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'multipart/form-data'
    );
    console.log(article);
    console.log(file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', article.name);
    formData.append('type', article.type);
    formData.append('size', article.size);
    formData.append('size_cm', '43');
    formData.append('price', article.price);
    formData.append('quantity', article.quantity);

    try {
      const resp: any = await this.http
        .post(`${this.urlBase}/products`, formData)
        .toPromise();
      return { ok: true, data: resp.data };
    } catch (e) {
      return { ok: false, error: e };
    }
  }
}
