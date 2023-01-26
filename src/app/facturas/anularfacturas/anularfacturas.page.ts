import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FacturasService } from 'src/app/api/facturas.service';

@Component({
  selector: 'app-anularfacturas',
  templateUrl: './anularfacturas.page.html',
  styleUrls: ['./anularfacturas.page.scss'],
})
export class AnularfacturasPage implements OnInit {

  factC: any[] = []

  suscription!: Subscription;

  constructor(
    private facturaService: FacturasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarCliente();
    this.suscription = this.facturaService.refresh$.subscribe(() => {
      this.cargarCliente();
    })
  }

  cargarCliente() {
    this.facturaService.listarAllServicioAnuladas(+localStorage.getItem("id-username")!)
      .subscribe(servicios => {
        this.factC = servicios
        console.log(this.factC)

      });
  }

}
