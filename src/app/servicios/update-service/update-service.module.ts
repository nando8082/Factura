import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateServicePageRoutingModule } from './update-service-routing.module';

import { UpdateServicePage } from './update-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateServicePageRoutingModule
  ],
  declarations: [UpdateServicePage]
})
export class UpdateServicePageModule {}
