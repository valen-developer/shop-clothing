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
  }

  saveArticle() {
    if (this.form.valid) {
      console.log('Es valido');
      this.productService.postArticle(this.form.value);
    }
  }

  showModal(action) {
    if (action === 'new') {
      this.modalTitle = 'Nuevo Artículo';
    } else {
      this.modalTitle = 'Editar Artículo';
    }

    const modal = document.getElementById('modalProduct');
    modal.style.display = 'block';
  }

  hiddenModal() {
    const modal = document.getElementById('modalProduct');
    modal.style.display = 'none';
  }

  async getProducts() {
    this.items = await this.productService.getShoes();
    this.items.forEach((item) => {
      item.urlimage = `http://localhost:3001/${item.urlimage}`;
    });
  }
}
