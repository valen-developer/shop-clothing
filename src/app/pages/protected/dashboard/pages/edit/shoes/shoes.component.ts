import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductsService } from '../../../../../../services/products.service';

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

  ngOnInit(): void {
    this.getProducts();
  }

  // Create form to edit
  setForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      quantity: [null, Validators.required],
      price: ['', Validators.required],
      size: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  // Connect to backend
  async updateProduct(item) {
    console.log(this.selectedProduct);
    let file;
    if (this.files.length > 0) {
      file = this.files[0];
    } else {
      file = null;
    }
    this.selectedProduct.name = this.form.value.name;
    this.selectedProduct.quantity = this.form.value.quantity;
    this.selectedProduct.price = this.form.value.price;
    this.selectedProduct.size = this.form.value.size;

    const resp = await this.productService.updateProduct(
      this.selectedProduct,
      file
    );
  }
  async saveArticle(item) {
    if (this.modalTitle === 'Editar Artículo') {
      this.updateProduct(item);
    }

    if (this.form.valid) {
      const resp: any = await this.productService.postArticle(
        this.form.value,
        this.files[0]
      );
      this.showModalNotification(resp.ok);
      if (resp.ok) {
        console.log(resp);
        // resp.newProduct.urlimage =
        // this.items.push(resp.newProduct);
        setTimeout(() => {
          this.getProducts();
        }, 2000);
        this.form.reset();
        this.files = [];
      }
    }
  }
  async getProducts() {
    this.items = await this.productService.getAll();
    this.items.forEach((item) => {
      item.urlimage = `http://localhost:3001/${item.urlimage}`;
      console.log(item.urlimage);
    });
  }
  async deleteProduct() {
    const resp = await this.productService.deleteProduct(
      this.selectedProduct.id
    );

    let itemsAux = [];
    this.items.forEach((item) => {
      if (item.id !== this.selectedProduct.id) {
        itemsAux.push(item);
      }
    });
    this.items = itemsAux;

    this.hiddenModalDelete();
  }

  //Drag-drop control
  dragEvent(event) {
    this.overDrop = event;
  }

  // Modal control
  showModal(action, articule?) {
    if (action === 'new') {
      this.modalTitle = 'Nuevo Artículo';
      this.form.reset();
    } else {
      this.modalTitle = 'Editar Artículo';
      this.selectedProduct = articule;
      this.setValuesForm(articule);
    }
    const modal = document.getElementById('modalProduct');
    modal.style.display = 'block';
  }

  hiddenModal() {
    const modal = document.getElementById('modalProduct');
    modal.style.display = 'none';
  }
  private setValuesForm(articule) {
    this.form.get('name').setValue(articule.name);
    this.form.get('quantity').setValue(articule.quantity);
    this.form.get('price').setValue(articule.price);
    this.form.get('size').setValue(articule.size);
    this.form.get('type').setValue(articule.type);
  }

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
