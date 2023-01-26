import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnularfacturasPage } from './anularfacturas.page';

const routes: Routes = [
  {
    path: '',
    component: AnularfacturasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnularfacturasPageRoutingModule {}
