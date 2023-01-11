import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ServicesService } from 'src/app/api/services.service';
import { Servicio } from 'src/app/servicios/entidades';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.page.html',
  styleUrls: ['./list-services.page.scss'],
})
export class ListServicesPage implements OnInit {

  servicioT: Servicio[] = []
  subscription!: Subscription;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private servicioService: ServicesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarCliente();
    this.subscription=this.servicioService.refresh$.subscribe(()=>{
      this.cargarCliente();
    })
  }

  userRev(){
    return localStorage.getItem("username")
  }

  cargarCliente(){
    
    this.servicioService.listarAllServicio(+localStorage.getItem("id-username")!)
      .subscribe(servicios => {
        this.servicioT = servicios
       // console.log(this.servicioT)
      });
  }

  actualizar(servicio: Servicio){
    localStorage.setItem("idServicio",servicio.id.toString());
    this.router.navigate(["updateServices"]);
  }

  deleteServicio(cliente: Servicio){
    this.servicioService.deleteServicio(cliente.id).subscribe(
    )  
  }

  async presentActionSheet(cliente: Servicio) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Estas seguro?',
      animated: true,
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
              console.log(this.deleteServicio(cliente))
          },
          data: {
            action: this.deleteServicio,
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();    
  }

}
