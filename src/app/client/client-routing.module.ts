import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientPage } from './client.page';

const routes: Routes = [
  {
    path: '',
    component: ClientPage
  },
  {
    path: 'register-client',
    loadChildren: () => import('./register-client/register-client.module').then( m => m.RegisterClientPageModule)
  },
  {
    path: 'list-client',
    loadChildren: () => import('./list-client/list-client.module').then( m => m.ListClientPageModule)
  },
  {
    path: 'update-client',
    loadChildren: () => import('./update-client/update-client.module').then( m => m.UpdateClientPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPageRoutingModule {}
