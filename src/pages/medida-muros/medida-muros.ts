import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MedidaMurosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medida-muros',
  templateUrl: 'medida-muros.html',
})
export class MedidaMurosPage {
  elemento: string;
  titulo: string = "Muro";
  descripcion: string = "Ingrese Alto y Largo del muro";
  p_variable1: string = "Alto";
  p_variable2: string = "Ancho";


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.elemento= this.navParams.get('elemento');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedidaMurosPage');
  }

}
