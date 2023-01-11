import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ClientService } from 'src/app/api/client.service';
import { Cliente } from 'src/app/client/entidades';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.page.html',
  styleUrls: ['./update-client.page.scss'],
})
export class UpdateClientPage implements OnInit {

  clientUpdateForm : FormGroup = this.fb.group({   
    'id':[''],
    'tipoIdentificacion':['',[Validators.required]],
    'identificacionNumero' : ['', [Validators.required]],
    'nombre': ['', [Validators.required]],
    'direccion': ['', [Validators.required]],
    'telefono': ['', [Validators.required]],
    'correoElectronico': ['', [Validators.required]]
  }); 
  cliente: Cliente = new Cliente();

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
    this.actualizar();
  }

  actualizar() {
    let identificacionNumero = localStorage.getItem("identificacionNumero");
    this.clientService.getClientIdentification(identificacionNumero!).subscribe(data => {
    this.cliente = data;
    })
  }

  update(){
    if(!this.clientUpdateForm.valid){
      return false;
    }else{
 
      this.clientService.updateClient(this.clientUpdateForm.value)
      .subscribe(
        (data)=>{
          //console.log('hola', data)
          this.mostrarMensaje('El Cliente ha sido actualizado Correctamente');
          this.router.navigate(['../listarClient']);
          
         
        },
        (error)=>{
          //console.log('Ocurrio un error', error.error)
          this.mostrarMensaje(error.error)
        }
      );
      return true;
    }
  }

  async mostrarMensaje(mensaje: any){
    const toast = await this.toastController.create({
      position: 'top',
      message: mensaje,
      duration:3000
    });
    toast.present();
  }

}
