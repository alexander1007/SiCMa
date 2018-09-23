import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaElementosService } from '../../services/elementos/elemento.service';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { Elemento } from "../../app/models/elemento";
import { log } from 'util';



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
  //elementos: Array<{id:number, nombre: String, descripcion: String, fondo: String}>;
    elementos: any = [];
    imagenes: string[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public elementoService: ListaElementosService,
    public storage: Storage
  ) {


    this.elementos = [];
  
    this.elementoService.getListaElementos().valueChanges()
    .map(data =>{
      console.log(data);
      this.elementos = data;
      this.imagenes = Array(this.elementos.length);
      for (var index = 0; index < this.elementos.length; index++) {
       
        this.imagenes[index] = `img/elementos/`+this.elementos[index].fondo;
        this.generarFotos(index);
       
      }

    });
 

   

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
