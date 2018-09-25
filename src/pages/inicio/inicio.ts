import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menu: MenuController) {
    this.menu1Active();
  }
  //esto es para desactivar los menu en la pantalla login
  menu1Active() {
    this.menu.enable(false);
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
