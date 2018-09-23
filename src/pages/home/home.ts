import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //arreglo de los diferentes elementos a construir
 elementos: Array<{id:number, nombre: String, descripcion: String, fondo: String}>;
  constructor(public navCtrl: NavController) {

    this.elementos = [
      {id:1, nombre:'Muro/Pared', descripcion: 'Utilizados para cerrar espacios', fondo:'/assets/imgs/muro.jpg'},
      {id:2, nombre:'Cielo Raso', descripcion:'Uso Decorativo', fondo:'/assets/imgs/cielo.jpg'},
      {id:3, nombre:'Entrepiso', descripcion:'Division entre un piso y otro', fondo:'/assets/imgs/entrepiso.jpg'},
      {id:4, nombre:'Viga/Columna Concreto', descripcion:'Elemento en concreto', fondo:'/assets/imgs/concreto.jpg'},
      {id:5, nombre:'Cubierta', descripcion:'Es la teja de la edificacion',fondo:'/assets/imgs/cubierta.jpg'}
    ]

  }

}

