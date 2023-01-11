import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateFacturasPageRoutingModule } from './create-facturas-routing.module';

import { CreateFacturasPage } from './create-facturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateFacturasPageRoutingModule
  ],
  declarations: [CreateFacturasPage]
})
export class CreateFacturasPageModule {}
