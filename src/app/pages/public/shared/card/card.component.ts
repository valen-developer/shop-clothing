import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() shoe;

  constructor() {

   }

  ngOnInit(): void {
    this.shoe.urlimage = `http://localhost:3001/${this.shoe.urlimage}`;
  }

}
