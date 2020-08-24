import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() shoe;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkOfert();
    this.shoe.urlimage = `http://localhost:3001/${this.shoe.urlimage}`;
  }

  private checkOfert() {
    console.log(this.shoe.ofert);
    this.shoe.ofert === 'true'
      ? (this.shoe.ofert = true)
      : (this.shoe.ofert = false);
  }

  routerProduct() {
    this.router.navigate(['/product', this.shoe.id]);
  }
}
