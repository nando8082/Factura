import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
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

  factC: any[] = []

  suscription!: Subscription;

  constructor(
    private facturaService: FacturasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarFactura();
    this.suscription = this.facturaService.refresh$.subscribe(() => {
      this.cargarFactura();
    })
  }

  cargarFactura() {

    this.facturaService.listarAllServicioEmitidos(+localStorage.getItem("id-username")!)
      .subscribe(servicios => {
        this.factC = servicios
        console.log(this.factC)

      });
  }


}
