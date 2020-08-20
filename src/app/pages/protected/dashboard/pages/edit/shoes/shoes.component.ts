import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css'],
})
export class ShoesComponent implements OnInit {
  modalTitle: string = 'default';

  constructor() {}

  ngOnInit(): void {}

  showModal(action) {
    if (action === 'new') {
      this.modalTitle = 'Nuevo Artículo';
    } else {
      this.modalTitle = 'Editar Artículo';
    }

    const modal = document.getElementById('modalProduct');
    modal.style.display = 'block';
  }

  hiddenModal(){

    const modal = document.getElementById('modalProduct');
    modal.style.display = 'none';
  }

}
