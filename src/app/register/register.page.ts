import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userRegisterForm: FormGroup = this.fb.group({
    'username': ['', [Validators.required]],
    'password': ['', [Validators.required]],
    'confirmPassword': ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastControler: ToastController,
    private router: Router
  ) { }

  ngOnInit() {

  }

  register() {
    if (!this.userRegisterForm.valid) {
      return false;
    } else {
      console.log("Voy a enviar la data a la API");
      this.userService.register(this.userRegisterForm.value)
        .subscribe(
          (data) => {
            //this.userRegisterForm.reset()
            console.log('Hola', data)
            this.mostrarMensaje('El usuario se ha creado correctamente')
            this.router.navigate(['/home'])
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
