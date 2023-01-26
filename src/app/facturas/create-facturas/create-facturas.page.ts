import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/api/client.service';
import { FacturasService } from 'src/app/api/facturas.service';
import { ServicesService } from 'src/app/api/services.service';
import { Cliente } from 'src/app/client/entidades';
import { Detalles } from 'src/app/facturas/entidades';
import { Servicio } from 'src/app/servicios/entidades';

@Component({
  selector: 'app-create-facturas',
  templateUrl: './create-facturas.page.html',
  styleUrls: ['./create-facturas.page.scss'],
})
export class CreateFacturasPage implements OnInit {

  servicioT: Servicio[] = []
  dettalle: Detalles = new Detalles();
  detalles: Detalles[] = JSON.parse(localStorage.getItem("det")!);
  detalles1: any[] = JSON.parse(localStorage.getItem("det")!);
  subtotal: number = +localStorage.getItem("subtotal")!;
  total!: number
  totalF: number = +localStorage.getItem("totalfinal")!;
  impuesto: number = +localStorage.getItem("iva")!;

  det: any = [];
  suscription!: Subscription;
  cliente: Cliente = new Cliente();
  servicio: Servicio = new Servicio();
  date=new Date()

  facturaRegisterForm: FormGroup = this.fb.group({
    'fechaDeEmision': this.date.getFullYear()+"-0"+(this.date.getMonth() + 1)+"-"+this.date.getDate(),
    "subtotal": localStorage.getItem("subtotal"),
    "impuesto": localStorage.getItem("iva"),
    "total": localStorage.getItem("totalfinal"),
    "clienteId": ['', [Validators.required]],
    'usuarioId': localStorage.getItem("id-username"),
    "detalles": [JSON.parse(localStorage.getItem("det")!)]

  });

  constructor(
    private servicioService: ServicesService,
    private toastController: ToastController,
    private clienteService: ClientService,
    private facturaService: FacturasService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    let date = new Date().toLocaleDateString()
    console.log(date)
    localStorage.setItem("date", date)
  }

  buscarClienteIdentificacion(identificacion: string) {
    this.clienteService.getClienteIdentificacion(identificacion).subscribe(
      (data) => {
        this.cliente = data;
        console.log(this.cliente)
        this.mostrarMensaje('Cliente Encontrado')
      }, (error) => {
        this.mostrarMensaje(error.error)

      }
    )

  }


  cargarfactura() {
    if (!this.facturaRegisterForm.valid) {
      return false;
    } else {

      this.facturaService.register(this.facturaRegisterForm.value)
        .subscribe(
          (data) => {
            console.log('hola', data)


            this.facturaRegisterForm.reset();
            localStorage.removeItem("subtotal")
            localStorage.removeItem("totalfinal")
            localStorage.removeItem("iva")
            localStorage.removeItem("det"),
              this.mostrarMensaje('Factura Creada exitosamente');
            this.det.pop()
            this.router.navigate(['listfacturas']);
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
      duration: 1500
    });
    toast.present();
  }

}
