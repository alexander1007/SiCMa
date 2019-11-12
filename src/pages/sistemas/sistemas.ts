import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Navbar } from 'ionic-angular';
import { ListaSistemasService } from '../../services/sistemas/sistema.service';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { MedidaMurosPage } from '../medida-muros/medida-muros';
import { ElementoPage } from '../elemento/elemento';

/**
 * Generated class for the SistemasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface info {
  idProyecto: string,
  idUsuario: string,
  elemento: string

}
@IonicPage()
@Component({
  selector: 'page-sistemas',
  templateUrl: 'sistemas.html',
})
export class SistemasPage {
  @ViewChild(Navbar) navBar: Navbar;
  sistemas: any = [];
  imagenes: string[];
  elemento: string;
  info: info;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public sistemaService: ListaSistemasService,
    public storage: Storage,
    public menu: MenuController
  ) {
    this.menu1Active();
    this.elemento = this.navParams.get('elemento');
    this.sistemas = [];
    this.sistemaService.getListaSistemaxElemento(this.elemento).valueChanges()
      .subscribe(data => {
        this.sistemas = data;
        this.sistemas.sort(function (a, b) {
          return a.nombre.localeCompare(b.nombre);
        });
        this.imagenes = Array(this.sistemas.length);
        for (var index = 0; index < this.sistemas.length; index++) {

          this.imagenes[index] = `img/sistemas/` + this.sistemas[index].imagen;
          this.generarFotos(index);
        }
      })

  }
  //esto es para desactivar los menu en la pantalla login
  menu1Active() {
    this.menu.enable(false);
  }

  abrirMedidas(sistema) {
    this.info = this.navParams.get('infoSave');
    var infoSave = {
      idProyecto: this.info.idProyecto,
      idUsuario: this.info.idUsuario,
      elemento: this.info.elemento,
      sistema: sistema.nombre
    }
    this.navCtrl.push(MedidaMurosPage, { sistema: sistema.key, elemento: this.elemento, infoSave: infoSave });
  }

  generarFotos(index) {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(this.imagenes[index]);
    imageRef.getDownloadURL().then(url => {
      this.imagenes[index] = url;
      this.sistemas[index].foto = url;

    });
  }



  ionViewDidLoad() {
    this.navBar.backButtonClick = (ev: UIEvent) => {
      this.navCtrl.push(ElementoPage);
    }
  }

}
