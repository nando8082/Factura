import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FacturasService } from 'src/app/api/facturas.service';

@Component({
  selector: 'app-list-facturas',
  templateUrl: './list-facturas.page.html',
  styleUrls: ['./list-facturas.page.scss'],
})
export class ListFacturasPage implements OnInit {

  isModalOpen = false;
  factC: any[] = []
  factCTo: any[] = []
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

    this.facturaService.listarAllServicio(+localStorage.getItem("id-username")!)
      .subscribe(servicios => {
        this.factC = servicios
        console.log(this.factC)

      });
  }
  setOpen(isOpen: boolean, factt: any[]) {
    document.getElementById("modal1")!.removeChild
    this.isModalOpen = isOpen;
    this.factCTo = factt
    console.log(this.factCTo)
  }

  deleteFac(id: number) {
    this.facturaService.deleteFac(id).subscribe(
    )
  }

  ir() {
    this.router.navigate(['../detailfacturas'])
  }
}
