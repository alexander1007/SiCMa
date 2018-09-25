import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ListaElementosService } from '../../services/elementos/elemento.service';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { Elemento } from "../../app/models/elemento";
import { log } from 'util';
import { SistemasPage } from '../sistemas/sistemas';
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database"; import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';



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

     elementos: any = [];
    imagenes: string[];
 
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public elementoService: ListaElementosService,
    public storage: Storage,
    public db: AngularFireDatabase,
    public menu: MenuController
  ){
  this.menu1Active();

    this.elementoService.getListaElementos().valueChanges()
    .subscribe(data =>{
      console.log(data);
      this.elementos = data;
      this.imagenes = Array(this.elementos.length);
      for (var index = 0; index < this.elementos.length; index++) {
        console.log(this.elementos[index].nombre);
        this.imagenes[index] = `img/elementos/`+this.elementos[index].fondo;
        this.generarFotos(index);
       
      }

    });
  

  
  }

    //esto es para desactivar los menu en la pantalla login
    menu1Active() {
      this.menu.enable(false);
    } 
  
 abrirSistema(elemento){
 
 this.navCtrl.push(SistemasPage, {elemento: elemento});

 }

  generarFotos(index){
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(this.imagenes[index]);
    imageRef.getDownloadURL().then(url =>{
      this.imagenes[index] = url;
    this.elementos[index].imagen = url;
    
    });
}
  ionViewDidLoad() {
  }

}