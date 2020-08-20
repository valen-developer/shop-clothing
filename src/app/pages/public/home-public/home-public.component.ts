import { Component, OnInit } from '@angular/core';

import { ShoeService } from "../../../services/products/shoe.service";

@Component({
  selector: 'app-home-public',
  templateUrl: './home-public.component.html',
  styleUrls: ['./home-public.component.css']
})
export class HomePublicComponent implements OnInit {

  constructor(private shoeService: ShoeService) { }

  ngOnInit(): void {
  }


  getShoes(){

    this.shoeService.getShoes();

  }

}
