import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateFacturasPage } from './create-facturas.page';

const routes: Routes = [
  {
    path: '',
    component: CreateFacturasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateFacturasPageRoutingModule {}
