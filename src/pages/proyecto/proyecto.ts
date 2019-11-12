import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Platform, AlertController } from 'ionic-angular';
import { ElementoPage } from '../elemento/elemento';
import { ProyectoService } from '../../services/proyecto/proyecto.service';
import { InicioPage } from '../inicio/inicio';
import { SistemasPage } from '../sistemas/sistemas';

/**
 * Generated class for the ProyectoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proyecto',
  templateUrl: 'proyecto.html',
})
export class ProyectoPage {
  @ViewChild(Navbar) navBar: Navbar;
  cliente: any;
  identificacion: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public proyectoService: ProyectoService, private platform: Platform, private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (ev: UIEvent) => {
      this.navCtrl.push(InicioPage);
    }
  }

  crearPoryecto() {
    // validaciones
    if (this.cliente == '' || this.cliente == undefined) {
      const alert = this.alertCtrl.create({
        title: 'PlaCMa',
        subTitle: 'El nombre del cliente es requerido. Ingrese un valor.',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    if (this.identificacion == '' || this.identificacion == undefined) {
      const alert = this.alertCtrl.create({
        title: 'PlaCMa',
        subTitle: 'La identificación/NIT del cliente es requerida. Ingrese un valor.',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    var proyecto = {
      cliente: this.cliente,
      identificacion: this.identificacion
    }
    this.proyectoService.guardarProyecto(proyecto);
    this.navCtrl.push(ElementoPage);
  }


}
