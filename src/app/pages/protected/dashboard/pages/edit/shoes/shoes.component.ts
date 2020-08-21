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
      quantity: [1, Validators.required],
      price: ['0', Validators.required],
      size: ['42', Validators.required],
      type: ['', Validators.required],
    });

    this.form.get('name').setValue('Un nuevo nombre');
  }

  // Connect to backend
  async saveArticle() {
    if (this.form.valid) {
      const resp: any = await this.productService.postArticle(
        this.form.value,
        this.files[0]
      );
      this.showModalNotification(resp.ok);
      if (resp.ok) {
        this.form.reset();
        this.files = [];
      }
    }
  }
  async getProducts() {
    this.items = await this.productService.getAll();
    this.items.forEach((item) => {
      item.urlimage = `http://localhost:3001/${item.urlimage}`;
    });
  }

  //Drag-drop control
  dragEvent(event) {
    this.overDrop = event;
  }

  // Modal control
  showModal(action, articule?) {
    if (action === 'new') {
      this.modalTitle = 'Nuevo Artículo';
    } else {
      this.modalTitle = 'Editar Artículo';
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
}
