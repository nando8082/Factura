import { Injectable } from '@angular/core';
import { Observable, tap, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../client/entidades';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FacturaCabecera } from '../facturas/entidades';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  endPoint = environment.backEndServer + 'api/factura/'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  private _refresh$ = new Subject<void>();

  constructor(
    private httpClient: HttpClient
  ) { }

  get refresh$() {
    return this._refresh$;
  }

  getClientIdentification(identificacionNumero: String) {
    let finalUrl = this.endPoint + 'findByCedula';
    return this.httpClient.get<Cliente>(finalUrl + "/" + identificacionNumero)
  }

  register(factura: FacturaCabecera): Observable<any> {
    let finalUrl = this.endPoint + 'create';
    console.log(JSON.stringify(factura))
    return this.httpClient.post<FacturaCabecera>(finalUrl, JSON.stringify(factura), this.httpOptions)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  listarAllServicio(idUser: number): Observable<FacturaCabecera[]> {
    let finalUrl = this.endPoint + 'findAll';
    return this.httpClient.get<FacturaCabecera[]>(finalUrl + "/" + idUser, this.httpOptions)
  }

  listarAllServicioEmitidos(idUser: number): Observable<FacturaCabecera[]> {
    let finalUrl = this.endPoint + 'findAll/issued';
    return this.httpClient.get<FacturaCabecera[]>(finalUrl + "/" + idUser, this.httpOptions)
  }

  listarAllServicioAnuladas(idUser: number): Observable<FacturaCabecera[]> {
    let finalUrl = this.endPoint + 'findAll/cancel';
    return this.httpClient.get<FacturaCabecera[]>(finalUrl + "/" + idUser, this.httpOptions)
  }

  deleteFac(id: number) {
    let finalUrl = this.endPoint + 'cancel';
    return this.httpClient.get(finalUrl + "/" + id)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

}
