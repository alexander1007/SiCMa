import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Platform, AlertController } from 'ionic-angular';
import { ElementoPage } from '../elemento/elemento';
import { ProyectoService } from '../../services/proyecto/proyecto.service';
import { InicioPage } from '../inicio/inicio';
import { SistemasPage } from '../sistemas/sistemas';
import * as moment from 'moment';
import { HistorialPage } from '../historial/historial';
import { Storage } from '@ionic/storage';



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
  usuarioId: any;
  fecha: string;
  @ViewChild(Navbar) navBar: Navbar;
  cliente: any;
  identificacion: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public proyectoService: ProyectoService, private platform: Platform, private alertCtrl: AlertController,
    public storage: Storage) {
    this.fecha = moment().format('YYYY/MM/DD H:mm:ss');
    this.alertaInfoApp();
    // obtenemos el id del usuario autenticado
    this.storage.get('idUsuario').then((val) => {
      this.usuarioId = val;
    });

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
      identificacion: this.identificacion,
      fecha: this.fecha,
      usuarioId: this.usuarioId
    }
    this.proyectoService.guardarProyecto(proyecto);
    this.navCtrl.push(ElementoPage);
  }


  abrirHistorico() {
    this.navCtrl.push(HistorialPage);

  }
  // muestra un mensaje al usuario, para que este acepte, abvierte que la aplicacion solo es un asesor
  alertaInfoApp() {
    const alert = this.alertCtrl.create({
      title: 'PlaCMa',
      subTitle: 'La información y los cálculos presentados en esta aplicación, no <b>reemplazarán</b> u <b>homologarán</b> las especificaciones o diseños de un profesional.<br><br> Todos los cálculos tienen incluido un desperdicio del <b>5%</b> en los materiales. ',
      buttons: ['Aceptar']
    });
    alert.present();
  }
}
