import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateClientPageRoutingModule } from './update-client-routing.module';

import { UpdateClientPage } from './update-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateClientPageRoutingModule
  ],
  declarations: [UpdateClientPage]
})
export class UpdateClientPageModule {}
