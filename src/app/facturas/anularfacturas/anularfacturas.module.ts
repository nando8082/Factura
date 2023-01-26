import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnularfacturasPageRoutingModule } from './anularfacturas-routing.module';

import { AnularfacturasPage } from './anularfacturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnularfacturasPageRoutingModule
  ],
  declarations: [AnularfacturasPage]
})
export class AnularfacturasPageModule {}
