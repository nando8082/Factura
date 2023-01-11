import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicesService } from 'src/app/api/services.service';

@Component({
  selector: 'app-registerservice',
  templateUrl: './registerservice.page.html',
  styleUrls: ['./registerservice.page.scss'],
})
export class RegisterservicePage implements OnInit {

  serviceRegisterForm: FormGroup = this.fb.group({
    'descripcion': ['', [Validators.required]],
    'precioUnitario': ['', [Validators.required]],
    'usuarioId': localStorage.getItem("id-username")
  });

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  registerService() {
    if (!this.serviceRegisterForm.valid) {
      return false;
    } else {

      this.servicesService.postService(this.serviceRegisterForm.value)
        .subscribe(
          (data) => {
            //console.log('hola', data)
            this.mostrarMensaje('Servicio registrado');
            this.router.navigate(['../listServices']);

            this.serviceRegisterForm.reset();
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
      position: 'top',
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

}
