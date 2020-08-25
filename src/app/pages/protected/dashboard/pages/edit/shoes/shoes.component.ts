import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { ProductsService } from '../../../../../../services/products.service';
import { ThrowStmt } from '@angular/compiler';

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
    private fb: FormBuilder
  ) {
    this.setForm();
  }

  //getters
  get sizes() {
    return this.form.get('sizes') as FormArray;
  }
  get quantityControl() {
    let quantityArray = this.form.get('quantity') as FormArray;
    return quantityArray.controls;
  }

  ngOnInit(): void {
    this.getProducts();
  }

  /* Control of forms */

  // Create form to edit
  setForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', Validators.required],
      type: ['', Validators.required],
      ofert: ['NO'],
      ofert_price: [null],
      stock: [true],
      sizes: this.fb.array([
        [true],
        [true],
        [true],
        [true],
        [true],
        [true],
        [true],
      ]),
    });
  }
  private setValuesForm(articule) {
    this.form.get('name').setValue(articule.name);
    this.form.get('quantity').setValue(articule.quantity);
    this.form.get('price').setValue(articule.price);
    this.form.get('size').setValue(articule.size);
    this.form.get('type').setValue(articule.type);
  }
  //End control of forms

  // Connect to backend

  async getProducts() {
    this.items =  (await this.productService.getAll()).product;
    this.items.forEach((item) => {
      item.urlimage = `http://localhost:3001/${item.urlimage}`;
    });
  }

  async saveArticle() {
    console.log(this.form.value);
    if (this.modalTitle === 'Editar Artículo' && this.form.valid) {
      const resp: any = await this.updateProduct();
      this.showModalNotification(resp.ok);
      return;
    }

    if (this.form.valid) {
      const resp: any = await this.productService.postArticle(
        this.form.value,
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

  async updateProduct() {
    let file;
    if (this.files.length > 0) {
      console.log('Entra archivos');
      file = this.files;
    } else {
      file = null;
    }
    this.selectedProduct.name = this.form.value.name;
    this.selectedProduct.quantity = this.form.value.quantity;
    this.selectedProduct.price = this.form.value.price;
    this.selectedProduct.sizes = this.form.value.sizes;

    const resp: any = await this.productService.updateProduct(
      this.selectedProduct,
      file
    );

    this.hiddenModal();
    setTimeout(() => {
      this.getProducts();
    }, 2000);

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
