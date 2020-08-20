import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { ProtectedModule } from './pages/protected/protected.module';
import { PublicModule } from './pages/public/public.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ProtectedModule,
    PublicModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
