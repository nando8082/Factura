import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then( m => m.ClientPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'registerClient',
    loadChildren: () => import('./client/register-client/register-client.module').then( m => m.RegisterClientPageModule)
  },
  {
    path: 'listarClient',
    loadChildren: () => import('./client/list-client/list-client.module').then( m => m.ListClientPageModule)
  },
  {
    path: 'updateClient',
    loadChildren: () => import('./client/update-client/update-client.module').then( m => m.UpdateClientPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./servicios/servicios.module').then( m => m.ServiciosPageModule)
  },
  {
    path: 'registerservice',
    loadChildren: () => import('./servicios/registerservice/registerservice.module').then( m => m.RegisterservicePageModule)
  },
  {
    path: 'listServices',
    loadChildren: () => import('./servicios/list-services/list-services.module').then( m => m.ListServicesPageModule)
  },
  {
    path: 'updateServices',
    loadChildren: () => import('./servicios/update-service/update-service.module').then( m => m.UpdateServicePageModule)
  },
  {
    path: 'facturas',
    loadChildren: () => import('./facturas/facturas.module').then( m => m.FacturasPageModule)
  },
  {
    path: 'createfacturas',
    loadChildren: () => import('./facturas/create-facturas/create-facturas.module').then( m => m.CreateFacturasPageModule)
  },
  {
    path: 'listfacturas',
    loadChildren: () => import('./facturas/list-facturas/list-facturas.module').then( m => m.ListFacturasPageModule)
  },
  {
    path: 'detailfacturas',
    loadChildren: () => import('./facturas/create-details/create-details.module').then( m => m.CreateDetailsPageModule)
  },
  {
    path: 'anularfacturas',
    loadChildren: () => import('./facturas/anularfacturas/anularfacturas.module').then( m => m.AnularfacturasPageModule)
  },
  {
    path: 'detallefactura',
    loadChildren: () => import('./facturas/detallefactura/detallefactura.module').then( m => m.DetallefacturaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
