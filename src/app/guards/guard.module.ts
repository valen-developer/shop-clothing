import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogGuard } from './log.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LogGuard],
})
export class GuardModule {}
