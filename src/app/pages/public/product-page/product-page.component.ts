import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  productID;
  product: any;
  imagenes: any[];

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProductImages();
    this.getProduct();
  }

  getProductImages() {
    this.route.params.subscribe(async (params) => {
      this, (this.productID = params.id);

      const data = await this.productsService.getImagesById(this.productID);

      if (data.ok) {
        this.imagenes = data.images;
        this.setUrlImages();
      }
    });
  }

  async getProduct() {
    const resp: any = await this.productsService.getProductById(this.productID);
    console.log(resp);
    this.product = resp.data.data[0];
  }

  private setUrlImages() {
    this.imagenes.forEach((image) => {
      image.urlimage = `http://localhost:3001/${image.urlimage}`;
    });
  }
}
