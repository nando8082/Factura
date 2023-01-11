import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  fecha : Date = new Date();

  constructor(
    private router: Router
  )

  {

  }

  cerrarSesion(){
    localStorage.setItem("ingresado","false")
    this.router.navigate(['../login']);
  }

  userRev(){
    return localStorage.getItem("username")
  }
}
