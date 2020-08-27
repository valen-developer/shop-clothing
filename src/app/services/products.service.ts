import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private urlBase = 'http://localhost:3001/api';
  constructor(private http: HttpClient) {}

  // Prducts and sizes
  async getAll() {
    const dataProducts: any = await this.http
      .get(`${this.urlBase}/products/all`)
      .toPromise();

    const data: any = {
      product: dataProducts.data.data,
    };
    return data;
  }

  // Product
  async getProductById(id) {
    const params = new HttpParams().set('id', id);

    const resp = await this.http
      .get(`${this.urlBase}/product`, { params })
      .toPromise();

    return resp;
  }

  //Products
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

  // product
  async postArticle(article, files) {
    const formData = this.setFormData(article, files);

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

  //Product
  async updateProduct(article, files) {
    const formData = this.setFormData(article, files);
    try {
      const resp: any = await this.http
        .put(`${this.urlBase}/products`, formData)
        .toPromise();
      return resp.data;
    } catch (e) {
      return { ok: false, error: e };
    }
  }

  async deleteProduct(product) {
    const params = new HttpParams()
      .set('id', product.id)
      .set('name', product.name)
      .set('type', product.type);

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

  private setFormData(article, files): FormData {
    const formData = new FormData();
    if (files) {
      let i = 1;
      files.forEach((file) => {
        formData.append(`file`, file);
        i++;
      });
      formData.append('fileLength', (i - 1).toString());
    }
    formData.append('id', article.id);
    formData.append('name', article.name);
    formData.append('type', article.type);
    formData.append('sizes', JSON.stringify(article.sizes));
    formData.append('price', article.price);
    formData.append('urlimage', article.urlimage);
    formData.append('ofert', article.ofert);
    formData.append('stock', article.stock);
    formData.append('ofert_price', article.ofert_price);

    return formData;
  }
}
