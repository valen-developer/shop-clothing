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
  admin: boolean = false;
  itemsInCar: number = 0;

  constructor(
    private userService: UserService,
    private carService: CarService
  ) {
    this.userService.loggedObservable.subscribe((logState) => {
      this.logged = logState;
    });
    this.userService.adminObservable.subscribe((role) => {
      console.log('admin si o no');
      console.log(role);
      this.admin = role;
    });
    this.carService.produtsLengthController.subscribe((length) => {
      this.itemsInCar = length;
    });
  }

  ngOnInit(): void {}

  async logOut() {
    localStorage.setItem('token', '');
    await this.carService.clearCar();
    await this.userService.verifyLogged();
    console.log('====== EJECUTAMOS ROLE =========');
    await this.userService.verifyRole();
  }
}
