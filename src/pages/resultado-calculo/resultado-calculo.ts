import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ElementoPage } from '../elemento/elemento';

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
  valorTotal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController) {
    this.materiales= this.navParams.get('materiales');
    this.valorTotal= this.navParams.get('valorTotalC');
  }

  abrirElemento(){

    const alert = this.alertCtrl.create({
      title: 'SiCMa',
      subTitle: 'Gracias por preferirnos. Desea inciar un nuevo calculo?',
      buttons: [{

        text: 'Ok',
        handler: () =>{
          this.navCtrl.push(ElementoPage);
        }
      }]
    });
    alert.present();

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoCalculoPage');
  }

}
