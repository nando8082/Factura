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
  detalle: Detalles = new Detalles();
  detalles: Detalles[] = [];
  detalles1: any[] = JSON.parse(localStorage.getItem("det")!)
  subtotal: number = +localStorage.getItem("subtotal")!
  total!: number
  totalF: number = +localStorage.getItem("totalfinal")!
  impuesto: number = +localStorage.getItem("iva")!

  det = [];
  suscription!: Subscription
  cliente: Cliente = new Cliente()
  servicio: Servicio = new Servicio()
  date = new Date()

  /* Detalles */
  pre = 0
  subtotalDetail!: number;
  totalDetail!: number
  totalFDetail!: number
  impuestoDetail!: number
  servicioTDetail: Servicio[] = []
  detDetail: any = [];
  serviciof: Servicio = new Servicio

  serviciott: Servicio[] = []

  /* Detalles */
  user: FormGroup = this.fb.group({
    'producto': ['', [Validators.required]],
    'precioUnitario': ['', [Validators.required]],
    'cantidad1': ['', [Validators.required]],
  });

  /* Cabecera */

  facturaRegisterForm: FormGroup = this.fb.group({
    'fechaDeEmision': this.date.getFullYear() + "-0" + (this.date.getMonth() + 1) + "-" + this.date.getDate(),
    "subtotal": localStorage.getItem("subtotal"),
    "impuesto": localStorage.getItem("iva"),
    "total": localStorage.getItem("totalfinal"),
    "clienteId": ['', [Validators.required]],
    'usuarioId': +localStorage.getItem("id-username")!,
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
    this.cargarServicio();
  }

  buscarClienteIdentificacion(identificacion: string) {
    this.clienteService.getClienteIdentificacion(identificacion).subscribe(
      (data) => {
        this.cliente = data
        console.log(this.cliente)
        this.mostrarMensaje('Cliente Encontrado')
      }, (error) => {
        this.mostrarMensaje(error.error)

      }
    )
  }

  cargarfactura() {
    if (!this.facturaRegisterForm.valid) {
      return false
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
            this.router.navigate(['listar-factura']);
          },
          (error) => {
            //console.log('Ocurrio un error', error.error)
            this.mostrarMensaje(error.error)
          }
        );
      return true
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

  /* Detalles */
  cargarServicio() {
    this.servicioService.listarAllServicio(+localStorage.getItem("id-username")!)
      .subscribe(servicios => {
        this.servicioTDetail = servicios
      });
  }

  agregarDetalles(precioDet: number, idServicioDet: number, cantidad1Det: number, nomDet: String) {
    if (precioDet == 0 || idServicioDet == 0 || cantidad1Det == 0) {
      this.mostrarMensaje('Ingrese todos los campos');
    } else {
      this.totalDetail = precioDet * cantidad1Det;
      this.totalDetail.toFixed(2);
      this.detDetail.push(
        {
          "cantidad": cantidad1Det,
          "precioUnitario": precioDet,
          "total": this.totalDetail,
          "servicioId": idServicioDet,
          "descripcion": nomDet
        }
      )

      this.subtotalDetail = +localStorage.getItem("subtotal")!;

      console.log(this.subtotalDetail)
      this.subtotalDetail = (this.totalDetail + this.subtotalDetail)
      this.impuestoDetail = (this.subtotalDetail * 0.12);
      this.totalFDetail = this.impuestoDetail + this.subtotalDetail

      localStorage.setItem("subtotal", "" + this.subtotalDetail.toFixed(2))
      localStorage.setItem("totalfinal", "" + this.totalFDetail.toFixed(2))
      localStorage.setItem("iva", "" + this.impuestoDetail.toFixed(2))
      localStorage.setItem("det", JSON.stringify(this.detDetail))
      console.log(this.detDetail)
      this.user.reset()
    }
  }

  siguiente() {
    //  console.log("Termiando "+this.det.length)
    if (this.detDetail.length == 0) {
      this.mostrarMensaje('No ha agregado productos para la facturación');
    } else {
      this.detDetail.shift()
      this.subtotalDetail = 0
      this.impuestoDetail = 0
      this.totalFDetail = 0
      this.router.navigate(['../crear-factura'])
    }
  }

  selectedTeam = '';
  onSelected(value: number) {
    console.log("llega")
    this.selectedTeam = "" + value;
  }
  currentFood1: any = undefined;
  currentFood: any = undefined;
  handleChange(ev: any) {
    this.currentFood = ev.target.value;


    this.serviciof = this.currentFood
    console.log(this.serviciof.precioUnitario)
  }

  restoreLocalStorage() {
    localStorage.removeItem("subtotal")
    localStorage.removeItem("totalfinal")
    localStorage.removeItem("iva")
    localStorage.removeItem("det")

    this.detDetail.shift()
    this.subtotal = 0
    this.impuesto = 0
    this.totalF = 0
  }

}
