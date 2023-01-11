import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../register/entidades';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endPoint = environment.backEndServer + 'api/usuario/'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  register(usuario: Usuario): Observable<any> {
    let finalUrl = this.endPoint + 'create'
    return this.httpClient.post<Usuario>(finalUrl, JSON.stringify(usuario), this.httpOptions)
  }

  /* login(usuario: Usuario): Observable<any>{
    let finalUrl = this.endPoint + 'login'
    return this.httpClient.post<Usuario>(finalUrl, JSON.stringify(usuario), {observe: 'respose'})
  } */

  login(usuario: Usuario): Observable<any> {
    let finalUrl = this.endPoint + 'login'
    return this.httpClient.post<Usuario>(finalUrl, JSON.stringify(usuario), this.httpOptions)
  }
}
