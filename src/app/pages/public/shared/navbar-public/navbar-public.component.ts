import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-navbar-public',
  templateUrl: './navbar-public.component.html',
  styleUrls: ['./navbar-public.component.css'],
})
export class NavbarPublicComponent implements OnInit {
  logged: boolean = false;
  itemsInCar: number = 0;

  constructor(
    private userService: UserService,
    private carService: CarService
  ) {
    this.userService.loggedObservable.subscribe((logState) => {
      this.logged = logState;
    });
    this.carService.produtsLengthController.subscribe((length) => {
      this.itemsInCar = length;
    });
  }

  ngOnInit(): void {}

  logOut() {
    localStorage.setItem('token', '');
    this.userService.verifyLogged();
    this.carService.clearCar();
  }
}
