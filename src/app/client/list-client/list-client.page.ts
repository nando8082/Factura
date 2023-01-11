import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/api/client.service';
import { Cliente } from 'src/app/client/entidades';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.page.html',
  styleUrls: ['./list-client.page.scss'],
})
export class ListClientPage implements OnInit {
  

  clientesT: Cliente[] = []
  subscription!: Subscription;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarCliente();
    this.subscription = this.clientService.refresh$.subscribe(() => {
      this.cargarCliente();
    })
  }

  cargarCliente() {
    this.clientService.listarAllClientes()
      .subscribe(clientes => {
        this.clientesT = clientes
        console.log(this.clientesT)

      });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.cargarCliente();
    }, 2000);
  };

  actualizar(cliente: Cliente) {
    localStorage.setItem("identificacionNumero", cliente.identificacionNumero.toString());
    localStorage.setItem("id", cliente.id.toString());
    this.router.navigate(["updateClient"]);
  }

  delete(cliente: Cliente) {
    this.clientService.deleteCliente(cliente.id).subscribe(
    )
  }

  async presentActionSheet(cliente: Cliente) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Estas seguro?',
      animated: true,
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
              console.log(this.delete(cliente))
          },
          data: {
            action: this.delete,
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();    
  }

}
