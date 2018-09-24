import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaMedidasService } from '../../services/medidas/medida.service';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MedidaMurosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medida-muros',
  templateUrl: 'medida-muros.html',
})
export class MedidaMurosPage {
  elemento: string;
  titulo: string;
  descripcion: string;
  p_variable1: string;
  p_variable2: string;


  medidas: any =[];
  imagenes: string[];


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public medidaService: ListaMedidasService,
    public storage: Storage,
    public db: AngularFireDatabase) {
      this.elemento= this.navParams.get('elemento');

      this.medidaService.getListaMedidas().valueChanges()
    .subscribe(data =>{
      console.log(data);
      this.medidas = data;

      this.titulo = this.medidas.titulo;
      this.descripcion = this.medidas.descripcion;
      this.p_variable1 = this.medidas.variable1;
      this.p_variable2 = this.medidas.variable2;
      this.imagenes = Array(this.medidas.length);
      for (var index = 0; index < this.medidas.length; index++) {
        console.log(this.medidas[index].nombre);
        this.imagenes[index] = `img/medidas/`+this.medidas[index].fondo;
        //this.generarFotos(index);
       }
    });
    
    }


  //  generarFotos(index){
  //   let storageRef = firebase.storage().ref();
  //   let imageRef = storageRef.child(this.imagenes[index]);
  //   imageRef.getDownloadURL().then(url =>{
  //     this.imagenes[index] = url;
  //   this.medidas[index].imagen = url;
  //   })
  // }

    

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedidaMurosPage');
  }

}
