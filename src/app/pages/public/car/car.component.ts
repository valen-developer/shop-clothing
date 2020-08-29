import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {

  items = [];


  constructor(private carService: CarService) {
    this.carService.productsController.subscribe((data) => {
      this.items = data;
      console.log(this.items);
    });
  }

  ngOnInit(): void {}
}
