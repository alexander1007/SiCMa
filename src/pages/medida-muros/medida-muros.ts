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
  sistema: string;
  titulo: string;
  descripcion: string;
  p_variable1: string;
  p_variable2: string;
  url_imagen : string;


  medidas: any =[];
  imagenes: string[];


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public medidaService: ListaMedidasService,
    public storage: Storage,
    public db: AngularFireDatabase) {
      this.elemento= this.navParams.get('elemento');
      this.sistema= this.navParams.get('sistema');

      this.medidaService.getListaMedidasByelemento(this.elemento).valueChanges()
    .subscribe(data =>{
      console.log(data);
      this.medidas = data;

      this.titulo = this.medidas[0].titulo;
      this.descripcion = this.medidas[0].descripcion;
      this.p_variable1 = this.medidas[0].variable1;
      this.p_variable2 = this.medidas[0].variable2;
      this.imagenes = Array(this.medidas.length);
    //  for (var index = 0; index < this.medidas.length; index++) {
        this.imagenes[0] = `img/medidas/`+this.medidas[0].imagen;
        this.generarFotos(0);
      // }
    });
    
    }


   generarFotos(index){
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(this.imagenes[index]);
    imageRef.getDownloadURL().then(url =>{
      this.imagenes[index] = url;
    this.medidas[index].foto = url;
    this.url_imagen = this.medidas[0].foto;
    })
  }

    

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedidaMurosPage');
  }

}
