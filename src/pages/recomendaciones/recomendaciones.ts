import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the RecomendacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recomendaciones',
  templateUrl: 'recomendaciones.html',
})
export class RecomendacionesPage {
  materiales: any =[];
  recomendaciones: any =[];
  valorTotal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public menu: MenuController) {
    this.menu1Active();
    this.materiales= this.navParams.get('materiales');
    this.valorTotal= this.navParams.get('valorTotalC');
    this.recomendaciones=this.navParams.get('recomendaciones');
  }

     //esto es para desactivar los menu en la pantalla login
     menu1Active() {
      this.menu.enable(false);
    }

  ionViewDidLoad() {
    this.materiales= this.navParams.get('materiales');
    this.valorTotal= this.navParams.get('valorTotalC');
    this.recomendaciones=this.navParams.get('recomendaciones');
  }

  openPage(page){
    this.navCtrl.push(page, {materiales: this.materiales, valorTotalC:this.valorTotal, recomendaciones:this.recomendaciones});
}
}
