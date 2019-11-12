import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Navbar } from 'ionic-angular';
import { ListaElementosService } from '../../services/elementos/elemento.service';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
//import { Elemento } from "../../ap//p/models/elemento";
//import { log } from 'util';
import { SistemasPage } from '../sistemas/sistemas';
import { AngularFireDatabase } from "angularfire2/database";
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { InicioPage } from '../inicio/inicio';
import { ProyectoPage } from '../proyecto/proyecto';



/**
 * Generated class for the ElementoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-elemento',
  templateUrl: 'elemento.html',
})
export class ElementoPage {
  usuarioId: any;
  proyectoId: any;
  @ViewChild(Navbar) navBar: Navbar;

  elementos: any = [];
  imagenes: string[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public elementoService: ListaElementosService,
    public storage: Storage,
    public db: AngularFireDatabase,
    public menu: MenuController
  ) {
    this.menu1Active();

    this.elementoService.getListaElementos().valueChanges()
      .subscribe(data => {

        this.elementos = data;
        this.elementos.sort(function (a, b) {
          return a.nombre.localeCompare(b.nombre);
        });
        this.imagenes = Array(this.elementos.length);
        for (var index = 0; index < this.elementos.length; index++) {
          this.imagenes[index] = `img/elementos/` + this.elementos[index].fondo;
          this.generarFotos(index);

        }

      });
    // obtenemos el id del proyecto creado
    this.storage.get('idProyecto').then((val) => {
      this.proyectoId = val;
    });

    // obtenemos el id del usuario autenticado
    this.storage.get('idUsuario').then((val) => {
      this.usuarioId = val;
    });

  }

  //esto es para desactivar los menu en la pantalla login
  menu1Active() {
    this.menu.enable(false);
  }

  abrirSistema(elemento) {
    var infoSave = {
      idProyecto: this.proyectoId,
      idUsuario: this.usuarioId,
      elemento: elemento.nombre
    }
    this.navCtrl.push(SistemasPage, { elemento: elemento.key, infoSave: infoSave });

  }

  generarFotos(index) {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(this.imagenes[index]);
    imageRef.getDownloadURL().then(url => {
      this.imagenes[index] = url;
      this.elementos[index].imagen = url;

    });
  }
  ionViewDidLoad() {
    this.navBar.backButtonClick = (ev: UIEvent) => {
      this.navCtrl.push(ProyectoPage);
    }
  }

}