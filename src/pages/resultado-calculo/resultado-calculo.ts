import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResultadoCalculoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultado-calculo',
  templateUrl: 'resultado-calculo.html',
})
export class ResultadoCalculoPage {

  materiales: any =[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.materiales= this.navParams.get('materiales');
    console.log(this.materiales);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoCalculoPage');
  }

}
