import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { ImagesService } from 'src/app/services/images.service';

import { ProductsService } from 'src/app/services/products.service';
import { SizesService } from 'src/app/services/sizes.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  productID;
  product: any;
  imagenes: any[];
  sizes: Size[] = [];
  form: FormGroup;
  productSelected: Product = { name: '', urlimage: '' };

  constructor(
    private productsService: ProductsService,
    private imagesService: ImagesService,
    private sizesService: SizesService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      size: ['', [Validators.required]],
      quantity: [0, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getProductImages();
    this.getProduct();
    this.setSizes();
  }

  getProductImages() {
    this.route.params.subscribe(async (params) => {
      this, (this.productID = params.id);
      const data = await this.imagesService.getImagesById(this.productID);
      if (data.ok) {
        this.imagenes = data.images;
        this.setUrlImages();
      }
    });
  }

  selectSize(size: Size, index: number) {
    for (let i = 0; i < this.sizes.length; i++) {
      const ele = document.getElementById(i.toString());
      ele.classList.remove('size-selected');
    }
    if (size.quantity > 0) {
      const ele = document.getElementById(index.toString());
      ele.classList.add('size-selected');
    }
  }

  submitForm() {
    console.log(this.form.value);
    this.checkForm();
  }

  showModalImage(image) {
    this.productSelected = {
      name: this.product.name,
      urlimage: image.urlimage,
    };

    console.log(this.productSelected);

    const imageModal = document.getElementById('image-modal');
    imageModal.style.display = 'block';
  }

  private checkForm() {
    this.sizes.forEach((size) => {
      if (size.size === this.form.get('size').value) {
        if (size.quantity <= 0) {
          const modal = document.getElementById('notSizeModal');
          modal.style.display = 'block';
          setTimeout(() => {
            modal.classList.add('fadeOut');
            setTimeout(() => {
              modal.classList.remove('fadeOut');
              modal.style.display = 'none';
            }, 1000);
          }, 2000);
        } else {
          console.log('talla disponible');
        }
      }
    });
  }

  private async getProduct() {
    const resp: any = await this.productsService.getProductById(this.productID);
    this.product = resp.data.data[0];

    this.product.ofert = (this.product.ofert === 'true') ? true : false;

    console.log(this.product);
    
  }

  private setUrlImages() {
    this.imagenes.forEach((image) => {
      image.urlimage = `http://localhost:3001/${image.urlimage}`;
    });
  }

  private async setSizes() {
    const sizes = await this.sizesService.getSizes(this.productID);
    sizes.data.forEach((size) => {
      this.sizes.push({
        size: size.size,
        quantity: size.quantity,
        selected: false,
      });
    });
  }
}

interface Size {
  size: string;
  quantity: number;
  selected: boolean;
}

interface Product {
  name: string;
  urlimage: string;
}
