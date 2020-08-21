import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

//Services
import { ProductsService } from '../app/services/products.service';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { ProtectedModule } from './pages/protected/protected.module';
import { PublicModule } from './pages/public/public.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    ProtectedModule,
    PublicModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [],
  providers: [ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
