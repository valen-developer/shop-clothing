import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

//Services
import { ShoeService } from '../app/services/products/shoe.service';
import { JacketService } from '../app/services/products/jacket.service';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { ProtectedModule } from './pages/protected/protected.module';
import { PublicModule } from './pages/public/public.module';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';

@NgModule({
  declarations: [AppComponent, NgDropFilesDirective],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    ProtectedModule,
    PublicModule,
    ReactiveFormsModule,
  ],
  providers: [ShoeService, JacketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
