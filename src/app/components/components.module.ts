import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalNotificationComponent } from "./modal-notification/modal-notification.component";
import { ImageModalComponent } from './image-modal/image-modal.component';


@NgModule({
  declarations: [ModalNotificationComponent, ImageModalComponent],
  imports: [
    CommonModule
  ],
  exports: [ModalNotificationComponent, ImageModalComponent]
})
export class ComponentsModule { }
