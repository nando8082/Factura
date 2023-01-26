import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicesService } from 'src/app/api/services.service';
import { Servicio } from 'src/app/servicios/entidades';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.page.html',
  styleUrls: ['./update-service.page.scss'],
})
export class UpdateServicePage implements OnInit {

  producto: any = []
  serviceUpdateForm: FormGroup = this.fb.group({
    'id': [localStorage.getItem("idServicio")],
    'descripcion': ['', [Validators.required]],
    'precioUnitario': ['', [Validators.required]]

  });
  servicio: Servicio = new Servicio()

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private servicioService: ServicesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarServicio();
  }

  cargarServicio() {
    let idS = localStorage.getItem("idServicio")
    let idU = localStorage.getItem("id-username")
    let producto
    this.servicioService.listarAllServicio(+idU!).subscribe(data => {
      console.log(data.find(x => x.id === (+idS!)))
      localStorage.setItem("producto",JSON.stringify(data.find(x => x.id === (+idS!))))
      /* this.servicio = data.find(x => x.id === (+idS!))  */
      producto = JSON.parse(localStorage.getItem("producto")!)
      this.servicio.id = producto.id
      this.servicio.descripcion = producto.descripcion
      this.servicio.precioUnitario = producto.precioUnitario
      this.servicio.usuarioId= producto.usuarioId
    })

  }

  actualizarServicio() {
    if (!this.serviceUpdateForm.valid) {
      return false;
    } else {

      this.servicioService.updateServicio(this.serviceUpdateForm.value)
        .subscribe(
          (data) => {
            //console.log('hola', data)
            this.mostrarMensaje('El Servicio ha sido actualizado Correctamente');
            this.router.navigate(['../listServices']);
            localStorage.removeItem("idServicio")

          },
          (error) => {
            //console.log('Ocurrio un error', error.error)
            this.mostrarMensaje(error.error)
          }
        );
      return true;
    }

  }


  async mostrarMensaje(mensaje: any) {
    const toast = await this.toastController.create({
      position: 'bottom',
      message: mensaje,
      duration: 1000
    });
    toast.present();
  }

}
