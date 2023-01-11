import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturasPage } from './facturas.page';

const routes: Routes = [
  {
    path: '',
    component: FacturasPage
  },
  {
    path: 'create-facturas',
    loadChildren: () => import('./create-facturas/create-facturas.module').then( m => m.CreateFacturasPageModule)
  },
  {
    path: 'list-facturas',
    loadChildren: () => import('./list-facturas/list-facturas.module').then( m => m.ListFacturasPageModule)
  },
  {
    path: 'create-details',
    loadChildren: () => import('./create-details/create-details.module').then( m => m.CreateDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturasPageRoutingModule {}
