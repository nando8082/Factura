import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup = this.fb.group({
    'username': ['', [Validators.required]],
    'password': ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastControler: ToastController,
    private router: Router
  ) { }

  ngOnInit() {

  }

  login() {
    if (!this.loginForm.valid) {
      return false;
    } else {
      console.log("Voy a enviar la data a la API");
      this.userService.login(this.loginForm.value)
        .subscribe(
          (data) => {
            //this.userRegisterForm.reset()
            console.log('Hola', data)
            this.mostrarMensaje('Usuario encontrado correctamente')
            localStorage.setItem("ingresado", "true")
            localStorage.setItem("id-username", data.id)
            localStorage.setItem("username", data.username)
            this.router.navigate(['/principal'])
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
