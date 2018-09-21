import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ElementoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-elemento',
  templateUrl: 'elemento.html',
})
export class ElementoPage {
  elementos: Array<{id:number, nombre: String, descripcion: String, fondo: String}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {


    this.elementos = [
      {id:1, nombre:'Muro', descripcion: 'Utilizados para cerrar espacios', fondo:'/assets/imgs/muro.jpg'},
      {id:2, nombre:'Cielo Raso', descripcion:'Uso Decorativo', fondo:'/assets/imgs/cielo.jpg'},
      {id:3, nombre:'Entrepiso', descripcion:'Division entre un piso y otro', fondo:'/assets/imgs/entrepiso.jpg'},
      {id:4, nombre:'Viga/Columna Concreto', descripcion:'Elemento en concreto', fondo:'/assets/imgs/concreto.jpg'},
      {id:5, nombre:'Cubierta', descripcion:'Es la teja de la edificacion',fondo:'/assets/imgs/cubierta.jpg'}
    ]

  }
  



  ionViewDidLoad() {
    console.log('ionViewDidLoad ElementoPage');
  }

}
