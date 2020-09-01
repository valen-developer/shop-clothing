import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-check-register',
  templateUrl: './check-register.component.html',
  styleUrls: ['./check-register.component.css'],
})
export class CheckRegisterComponent implements OnInit {
  registerToken;
  message = 'Comprobando Email';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    route.params.forEach((param) => {
      this.registerToken = param.token;
    });

    this.checkRegister();
  }

  ngOnInit(): void {}

  private async checkRegister() {
    const resp: any = await this.userService.checkRegister(this.registerToken);
    if (resp.ok) this.router.navigate(['/login']);
    else
      this.message =
        'No se ha podido verificar el email. Esto puede deberse a 2 motivos: ' +
        'Ha caducado el tiempo de verificación, por lo que deberá hacer de nuevo el proceso de registro. ' +
        'El email ya se encuentra registrado, pruebe a iniciar sesion.';
  }
}
