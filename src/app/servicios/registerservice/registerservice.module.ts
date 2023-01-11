import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterservicePageRoutingModule } from './registerservice-routing.module';

import { RegisterservicePage } from './registerservice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterservicePageRoutingModule
  ],
  declarations: [RegisterservicePage]
})
export class RegisterservicePageModule {}
