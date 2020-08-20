import { Component, OnInit } from '@angular/core';

import { ShoeService } from '../../../services/products/shoe.service';

@Component({
  selector: 'app-shoe',
  templateUrl: './shoe.component.html',
  styleUrls: ['./shoe.component.css'],
})
export class ShoeComponent implements OnInit {
  shoes: any[] = [];

  constructor(private shoeService: ShoeService) {}

  ngOnInit(): void {
    this.getShoes();
  }

  async getShoes() {
    this.shoes = await this.shoeService.getShoes();
  }
}
