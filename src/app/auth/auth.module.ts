import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { LoginComponent } from './login/login.component';
import { ModalPassComponent } from './modal-pass/modal-pass.component';
import { RegisterComponent } from './register/register.component';

//Routing
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ModalPassComponent],
  exports: [LoginComponent, RegisterComponent, ModalPassComponent],
  imports: [CommonModule, AppRoutingModule],
})
export class AuthModule {}
