import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ClientService } from 'src/app/api/client.service';
import { FacturasService } from 'src/app/api/facturas.service';
import { ServicesService } from 'src/app/api/services.service';
import { Servicio } from 'src/app/servicios/entidades';

@Component({
  selector: 'app-create-details',
  templateUrl: './create-details.page.html',
  styleUrls: ['./create-details.page.scss'],
})
export class CreateDetailsPage implements OnInit {

  pre = 0
  subtotal!: number;
  total!: number
  totalF!: number
  impuesto!: number
  servicioT: Servicio[] = []
  det : any = [];
  serviciof: Servicio = new Servicio

  serviciott: Servicio[] = []

  user: FormGroup = this.fb.group({
    'producto': ['', [Validators.required]],
    'precioUnitario': ['', [Validators.required]],
    'cantidad1': ['', [Validators.required]],
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
    this.cargarServicio();
  }

  cargarServicio() {
    this.servicioService.listarAllServicio(+localStorage.getItem("id-username")!)
      .subscribe(servicios => {
        this.servicioT = servicios
      });
  }

  agregarDetalles(precio: number, idServicio: number, cantidad1: number, nom: String) {
    if (precio == 0 || idServicio == 0 || cantidad1 == 0) {
      this.mostrarMensaje('Ingrese todos los campos');
    } else {
      this.total = precio * cantidad1;
      this.total.toFixed(2);
      this.det.push(
        {
          "cantidad": cantidad1,
          "precioUnitario": precio,
          "total": this.total,
          "servicioId": idServicio,
          "descripcion": nom
        }
      )

      this.subtotal = +localStorage.getItem("subtotal")!;

      console.log(this.subtotal)
      this.subtotal = (this.total + this.subtotal);
      this.impuesto = (this.subtotal * 0.12);
      this.totalF = this.impuesto + this.subtotal

      localStorage.setItem("subtotal", "" + this.subtotal.toFixed(2))
      localStorage.setItem("totalfinal", "" + this.totalF.toFixed(2))
      localStorage.setItem("iva", "" + this.impuesto.toFixed(2))
      localStorage.setItem("det", JSON.stringify(this.det))
      console.log(this.det)
      this.user.reset()
    }
  }

  siguiente() {
    //  console.log("Termiando "+this.det.length)
    if (this.det.length == 0) {
      this.mostrarMensaje('No ha agregado productos para la facturación');
    } else {
      this.det.shift()
      this.subtotal = 0
      this.impuesto = 0
      this.totalF = 0
      this.router.navigate(['../crear-factura'])
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

  selectedTeam = '';
  onSelected(value: number) {
    console.log("llega")
    this.selectedTeam = "" + value;
  }
  currentFood1 : any = undefined;
  currentFood : any = undefined;
  handleChange(ev : any) {
    this.currentFood = ev.target.value;


    this.serviciof = this.currentFood
    console.log(this.serviciof.precioUnitario)


  }

}
