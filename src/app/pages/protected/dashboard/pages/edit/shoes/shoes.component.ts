import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { ProductsService } from '../../../../../../services/products.service';
import { ThrowStmt } from '@angular/compiler';
import { ImagesService } from 'src/app/services/images.service';
import { SizesService } from 'src/app/services/sizes.service';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css'],
})
export class ShoesComponent implements OnInit {
  modalTitle: string = 'default';
  items: any[] = [];
  form: FormGroup;

  overDrop = false;
  files: any[] = [];
  modalNotificationMessage = '';
  private selectedProduct: any;

  constructor(
    private productService: ProductsService,
    private imagesService: ImagesService,
    private sizesServices: SizesService,
    private fb: FormBuilder
  ) {
    this.setForm();
  }

  //getters
  get sizes() {
    return this.form.get('sizes') as FormArray;
  }

  ngOnInit(): void {
    this.getProducts();
  }

  /* Control of forms */

  // Create form to edit
  private setForm() {
    this.form = this.fb.group({
      name: ['Nuevo', [Validators.required]],
      price: ['', Validators.required],
      type: ['', Validators.required],
      ofert: ['NO'],
      ofert_price: [null],
      stock: [true, Validators.required],
      sizes: this.fb.array([[0], [0], [0], [0], [0], [0], [0], [0]]),
    });
  }

  // Use when edit article. Call from showModal
  private async setValuesForm(article) {
    const data = await this.sizesServices.getSizes(this.selectedProduct.id);
    const sizes = data.data;
    let sizesArray = [];

    sizes.forEach((size) => {
      sizesArray.push(size.quantity);
    });
    while (sizesArray.length < 8) {
      sizesArray.push(0);
    }
    this.form.get('sizes').setValue(sizesArray);
    this.form.get('name').setValue(article.name);
    this.form.get('price').setValue(article.price);
    this.form.get('stock').setValue(article.stock === 'true' ? true : false);
    this.form.get('type').setValue(article.type);
    this.form.get('ofert').setValue(article.ofert);
    this.form.get('ofert_price').setValue(article.ofert_price);
  }
  //End control of forms

  private setSizes() {
    const sizes = this.form.get('sizes').value;
    if (this.form.get('type').value === 'jacket') {
      return [
        { size: 'small', quantity: sizes[0] },
        { size: 'medium', quantity: sizes[1] },
        { size: 'large', quantity: sizes[2] },
        { size: 'extralarge', quantity: sizes[3] },
      ];
    } else {
      return [
        { size: '39', quantity: sizes[0] ? sizes[0] : 0 },
        { size: '40', quantity: sizes[1] ? sizes[1] : 0 },
        { size: '41', quantity: sizes[2] ? sizes[2] : 0 },
        { size: '42', quantity: sizes[3] ? sizes[3] : 0 },
        { size: '43', quantity: sizes[4] ? sizes[4] : 0 },
        { size: '44', quantity: sizes[5] ? sizes[5] : 0 },
        { size: '45', quantity: sizes[6] ? sizes[6] : 0 },
        { size: '46', quantity: sizes[6] ? sizes[7] : 0 },
      ];
    }
  }

  // Use when saveArticle
  private setArticule() {
    // get sizes
    const sizes = this.setSizes();

    const art = {
      name: this.form.get('name').value,
      price: this.form.get('price').value,
      type: this.form.get('type').value,
      ofert_price:
        this.form.get('ofert_price').value !== null
          ? this.form.get('ofert_price').value
          : 0,
      ofert: this.form.get('ofert').value,
      stock: this.form.get('stock').value,
      sizes,
    };

    return art;
  }

  // Connect to backend

  async getProducts() {
    this.items = (await this.productService.getAll()).product;
    this.items.forEach((item) => {
      item.urlimage = `http://localhost:3001/${item.urlimage}`;
    });
  }

  async saveArticle() {
    const articuleToSave = this.setArticule();

    if (this.modalTitle === 'Editar Artículo' && this.form.valid) {
      const resp: any = await this.updateProduct(articuleToSave);
      this.showModalNotification(resp.ok);
      return;
    }
    if (this.form.valid) {
      const resp: any = await this.productService.postArticle(
        articuleToSave,
        this.files
      );
      this.showModalNotification(resp.ok);
      if (resp.ok) {
        setTimeout(() => {
          this.getProducts();
        }, 2000);
        this.form.reset();
        this.files = [];
      }
    }
  }

  async updateProduct(articleToSave) {
    let file;
    if (this.files.length > 0) {
      file = this.files;
    } else {
      file = null;
    }
    this.selectedProduct.name = articleToSave.name;
    this.selectedProduct.price = articleToSave.price;
    this.selectedProduct.type = articleToSave.type;
    this.selectedProduct.sizes = articleToSave.sizes;
    this.selectedProduct.stock = articleToSave.stock;
    this.selectedProduct.ofert = articleToSave.ofert;
    this.selectedProduct.ofert_price = articleToSave.ofert_price;

    console.log(this.selectedProduct);

    const resp: any = await this.productService.updateProduct(
      this.selectedProduct,
      file
    );

    this.hiddenModal();
    setTimeout(() => {
      this.getProducts();
    }, 2000);

    this.form.reset();
    this.getProducts();

    return resp;
  }

  async deleteProduct() {
    const resp = await this.productService.deleteProduct(this.selectedProduct);

    let itemsAux = [];
    this.items.forEach((item) => {
      if (item.id !== this.selectedProduct.id) {
        itemsAux.push(item);
      }
    });
    this.items = itemsAux;

    this.hiddenModalDelete();
  }
  //End connect to backend

  //Drag-drop control
  dragEvent(event) {
    this.overDrop = event;
  }

  /* Modals  */

  // Modal-notification control
  showModalNotification(ok: boolean) {
    const modalNot = document.getElementById('modalnotification');

    if (ok) {
      this.modalNotificationMessage =
        'El artículo se ha guardado correctamente';
      modalNot.style.backgroundColor = 'green';
      modalNot.style.display = 'block';
    } else {
      this.modalNotificationMessage = 'No se ha podido guardar el articulo';
      modalNot.style.backgroundColor = 'red';
      modalNot.style.display = 'block';
    }

    setTimeout(() => {
      modalNot.classList.add('fadeOut');

      setTimeout(() => {
        modalNot.classList.remove('fadeOut');
        modalNot.style.display = 'none';
      }, 1000);
    }, 2000);
  }

  // Modal control
  showModal(action, article?) {
    if (action === 'new') {
      this.modalTitle = 'Nuevo Artículo';
      this.form.reset();
    } else {
      this.modalTitle = 'Editar Artículo';
      this.selectedProduct = article;
      this.setValuesForm(article);
    }
    const modal = document.getElementById('modalProduct');
    modal.style.display = 'block';
  }

  hiddenModal() {
    const modal = document.getElementById('modalProduct');
    modal.classList.add('fadeOut');
    setTimeout(() => {
      modal.classList.remove('fadeOut');
      modal.style.display = 'none';
    }, 1000);
  }

  //Modal delete control
  showModalDelete(product) {
    this.selectedProduct = product;

    const modal = document.getElementById('modaldelete');
    modal.style.display = 'block';
  }
  hiddenModalDelete() {
    const modal = document.getElementById('modaldelete');
    modal.classList.add('fadeOut');
    setTimeout(() => {
      modal.classList.remove('fadeOut');
      modal.style.display = 'none';
    }, 1000);
  }
}
