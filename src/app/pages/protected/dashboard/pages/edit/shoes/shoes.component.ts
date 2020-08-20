import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ShoeService } from '../../../../../../services/products/shoe.service';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css'],
})
export class ShoesComponent implements OnInit {
  modalTitle: string = 'default';
  items: any[] = [];
  form: FormGroup;

  constructor(private shoeService: ShoeService) {
    this.setForm();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  setForm() {}

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
    this.items = await this.shoeService.getShoes();
    this.items.forEach((item) => {
      item.urlimage = `http://localhost:3001/${item.urlimage}`;
    });
  }
}
