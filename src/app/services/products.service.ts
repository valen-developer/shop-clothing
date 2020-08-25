import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private urlBase = 'http://localhost:3001/api';
  constructor(private http: HttpClient) {}

  async getAll() {
    const dataProducts: any = await this.http
      .get(`${this.urlBase}/products/all`)
      .toPromise();
    const id = dataProducts.data.data.id;

    const paramsSize = new HttpParams().set('id', id);
    const dataSizes: any = await this.http.get(`${this.urlBase}/sizes`, {
      params: paramsSize,
    });

    const data: any = { product: dataProducts.data.data, sizes: dataSizes.data };

    return data;
  }

  async getProductById(id) {
    const params = new HttpParams().set('id', id);

    const resp = await this.http
      .get(`${this.urlBase}/product`, { params })
      .toPromise();

    return resp;
  }

  async getImagesById(id) {
    const params = new HttpParams().set('id', id);

    const resp: any = await this.http
      .get(`${this.urlBase}/images`, {
        params,
      })
      .toPromise();

    return resp;
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

  async postArticle(article, files) {
    const formData = new FormData();

    // Set files
    let i = 1;
    files.forEach((file) => {
      formData.append(`file`, file);
      i++;
    });
    formData.append('fileLength', (i - 1).toString());
    formData.append('name', article.name);
    formData.append('type', article.type);
    formData.append('size', article.size);
    formData.append('size_cm', '43');
    formData.append('price', article.price);
    formData.append('quantity', article.quantity);
    formData.append('ofert', article.ofert);

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

  async updateProduct(article, files) {
    console.log('Actualizando');

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
    formData.append('size', article.size);
    formData.append('size_cm', '43');
    formData.append('price', article.price);
    formData.append('quantity', article.quantity);
    formData.append('urlimage', article.urlimage);
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
}
