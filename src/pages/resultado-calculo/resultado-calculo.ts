import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController, Navbar } from 'ionic-angular';
import { ElementoPage } from '../elemento/elemento';
import { InicioPage } from '../inicio/inicio';
import { MedidaMurosPage } from '../medida-muros/medida-muros';
import { ProyectoPage } from '../proyecto/proyecto';

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
  @ViewChild(Navbar) navBar: Navbar;
  materiales: any = [];
  recomendaciones: any = [];
  valorTotal: string;
  valorTotalM: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    public menu: MenuController) {
    this.menu1Active();
    this.materiales = this.navParams.get('materiales');
    this.valorTotal = this.navParams.get('valorTotalC');
    this.recomendaciones = this.navParams.get('recomendaciones');

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });
    this.valorTotalM = formatter.format(parseFloat(this.valorTotal)) // "$1,000"

  }
  //esto es para desactivar los menu en la pantalla login
  menu1Active() {
    this.menu.enable(false);
  }
  abrirElemento() {

    const alert = this.alertCtrl.create({
      title: 'PlaCMa',
      subTitle: 'Gracias por preferirnos. Seleccione: ?',
      buttons: [
        {
          text: 'Agregar nuevo cálculo',
          handler: () => {
            this.navCtrl.push(ElementoPage);
          }
        },
        {
          text: 'Crear Nuevo Proyecto',
          handler: () => {
            this.navCtrl.push(ProyectoPage);
          }
        },
        {
          text: 'Ir al inicio',
          handler: () => {
            this.navCtrl.push(InicioPage);
          }
        }
      ]
    });
    alert.present();


  }

  ionViewDidLoad() {
    this.materiales = this.navParams.get('materiales');
    this.valorTotal = this.navParams.get('valorTotalC');
    this.recomendaciones = this.navParams.get('recomendaciones');

  }

  openPage(page) {
    this.navCtrl.push(page, { materiales: this.materiales, valorTotalC: this.valorTotal, recomendaciones: this.recomendaciones });
  }



}
