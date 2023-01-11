import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListClientPageRoutingModule } from './list-client-routing.module';

import { ListClientPage } from './list-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListClientPageRoutingModule
  ],
  declarations: [ListClientPage]
})
export class ListClientPageModule {}
