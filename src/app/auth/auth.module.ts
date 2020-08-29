import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Components
import { LoginComponent } from './login/login.component';
import { ModalPassComponent } from './modal-pass/modal-pass.component';
import { RegisterComponent } from './register/register.component';

//Routing
import { AppRoutingModule } from '../app-routing.module';
import { GoHomeComponent } from './shared/go-home/go-home.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ModalPassComponent, GoHomeComponent],
  exports: [LoginComponent, RegisterComponent, ModalPassComponent, GoHomeComponent],
  imports: [CommonModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
