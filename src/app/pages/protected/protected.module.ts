import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Custom modules
import { ComponentsModule } from "../../components/components.module";

// Components
import { ProtectedComponent } from './protected.component';
import { ShoesComponent } from './dashboard/pages/edit/shoes/shoes.component';
import { UsersComponent } from './dashboard/pages/edit/users/users.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { UserProfileComponent } from './dashboard/pages/user-profile/user-profile.component';
import { NavbarComponent } from './dashboard/shared/navbar/navbar.component';
import { SidebarComponent } from './dashboard/shared/sidebar/sidebar.component';

// Directives
import { NgDropFilesDirective } from 'src/app/directives/ng-drop-files.directive';

// Routing
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    UsersComponent,
    UserProfileComponent,
    ShoesComponent,
    HomeComponent,
    ProtectedComponent,
    NgDropFilesDirective,
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    UsersComponent,
    UserProfileComponent,
    ShoesComponent,
    HomeComponent,
    ProtectedComponent,
  ],
  imports: [CommonModule, AppRoutingModule, FormsModule, ReactiveFormsModule, ComponentsModule],
})
export class ProtectedModule {}
