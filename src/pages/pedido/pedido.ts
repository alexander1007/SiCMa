import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InventarioPage } from '../inventario/inventario';

/**
 * Generated class for the PedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {

  producto: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.producto= this.navParams.get('producto');
  }

  abrirInventario(){
    this.navCtrl.push(InventarioPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidoPage');
  }

}
