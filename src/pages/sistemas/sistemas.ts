import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ListaSistemasService } from '../../services/sistemas/sistema.service';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { MedidaMurosPage } from '../medida-muros/medida-muros';

/**
 * Generated class for the SistemasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sistemas',
  templateUrl: 'sistemas.html',
})
export class SistemasPage {

  sistemas: any=[];
  imagenes: string[];
  elemento: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sistemaService: ListaSistemasService, 
              public storage: Storage,
              public menu: MenuController
            ) {
            this.menu1Active();
            this.elemento= this.navParams.get('elemento');
            this.sistemas=[];
            this.sistemaService.getListaSistemaxElemento(this.elemento).valueChanges()
         .subscribe(data =>{
           console.log(data);
           this.sistemas= data;
           this.imagenes= Array(this.sistemas.length);
           for (var index = 0; index < this.sistemas.length; index++) {
       
            this.imagenes[index] = `img/sistemas/`+this.sistemas[index].imagen;
            this.generarFotos(index);
         }})  

  }
     //esto es para desactivar los menu en la pantalla login
     menu1Active() {
      this.menu.enable(false);
    }

  abrirMedidas(sistema){
  
  this.navCtrl.push(MedidaMurosPage, {sistema: sistema, elemento: this.elemento });
  }

  generarFotos(index){
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(this.imagenes[index]);
    imageRef.getDownloadURL().then(url =>{
      this.imagenes[index] = url;
    this.sistemas[index].foto = url;
    console.log('generando');
    
    console.log(url);
    });
}



  ionViewDidLoad() {
    console.log('ionViewDidLoad SistemasPage');
  }

}
