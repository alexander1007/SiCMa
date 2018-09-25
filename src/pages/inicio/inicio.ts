import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ElementoPage } from '../elemento/elemento';
import { InventarioPage } from '../inventario/inventario';

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  abrirElemento(){
    this.navCtrl.push(ElementoPage);
  }

  abrirInventario(){
    this.navCtrl.push(InventarioPage);
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

}
