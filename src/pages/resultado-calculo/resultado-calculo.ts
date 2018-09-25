import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,
    public menu: MenuController) {
    this.menu1Active();
    this.materiales= this.navParams.get('materiales');
    this.valorTotal= this.navParams.get('valorTotalC');
  }
   //esto es para desactivar los menu en la pantalla login
   menu1Active() {
    this.menu.enable(false);
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
