import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiciosPage } from './servicios.page';

const routes: Routes = [
  {
    path: '',
    component: ServiciosPage
  },
  {
    path: 'registerservice',
    loadChildren: () => import('./registerservice/registerservice.module').then( m => m.RegisterservicePageModule)
  },
  {
    path: 'list-services',
    loadChildren: () => import('./list-services/list-services.module').then( m => m.ListServicesPageModule)
  },
  {
    path: 'update-service',
    loadChildren: () => import('./update-service/update-service.module').then( m => m.UpdateServicePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosPageRoutingModule {}
