import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallefacturaPageRoutingModule } from './detallefactura-routing.module';

import { DetallefacturaPage } from './detallefactura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DetallefacturaPageRoutingModule
  ],
  declarations: [DetallefacturaPage]
})
export class DetallefacturaPageModule {}
