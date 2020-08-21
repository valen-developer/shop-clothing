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
    const params = new HttpParams().set('type', 'shoe');
    const resp: any = await this.http
      .get(`${this.urlBase}/products`, {
        params,
      })
      .toPromise();

    return resp.data;
  }

  async getJackets() {
    const params = new HttpParams().set('type', 'jacket');
    const resp: any = await this.http
      .get(`${this.urlBase}/products`, { params })
      .toPromise();

    return resp.data;
  }

  async postArticle(article, file) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'multipart/form-data'
    );

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
      const newProduct = resp.newProduct;

      return { ok: true, data: resp.data, newProduct };
    } catch (e) {
      return { ok: false, error: e };
    }
  }

  async updateProduct(article, file) {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('id', article.id);
    formData.append('name', article.name);
    formData.append('type', article.type);
    formData.append('size', article.size);
    formData.append('size_cm', '43');
    formData.append('price', article.price);
    formData.append('quantity', article.quantity);

    const resp: any = await this.http
      .put(`${this.urlBase}/products`, formData)
      .toPromise();
  }

  async deleteProduct(id) {
    const params = new HttpParams().set('id', id);

    try {
      const resp: any = await this.http
        .delete(`${this.urlBase}/products`, {
          params,
        })
        .toPromise();

      return { ok: true, data: resp.data };
    } catch (e) {
      return { ok: false, error: e };
    }
  }
}
