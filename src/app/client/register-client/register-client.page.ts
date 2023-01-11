import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ClientService } from '../../api/client.service';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.page.html',
  styleUrls: ['./register-client.page.scss'],
})
export class RegisterClientPage implements OnInit {

  clientRegisterForm: FormGroup = this.fb.group({
    'tipoIdentificacion': ['', [Validators.required]],
    'identificacionNumero': ['', [Validators.required]],
    'nombre': ['', [Validators.required]],
    'direccion': ['', [Validators.required]],
    'telefono': ['', [Validators.required]],
    'correoElectronico': ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private toastControler: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    if (!this.clientRegisterForm.valid) {
      return false;
    } else {
      console.log("Voy a enviar la data a la API");
      this.clientService.register(this.clientRegisterForm.value)
        .subscribe(
          (data) => {
            //this.userRegisterForm.reset()
            console.log('Hola', data)
            this.mostrarMensaje('El cliente se ha creado correctamente')
            this.router.navigate(['/listarClient'])
            this.clientRegisterForm.reset();
          },
          (error) => {
            console.log('Ocurrio un error', error)
            this.mostrarMensaje(error.error)
          }
        )
      return true;
    }
  }

  async mostrarMensaje(mensaje: any) {
    const toast = await this.toastControler.create({
      position: 'top',
      message: mensaje,
      duration: 3000
    })
    toast.present()
  }
}
