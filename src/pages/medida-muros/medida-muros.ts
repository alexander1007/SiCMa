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
  sistema: string;
  elemento: string;
  titulo: string;
  descripcion: string;
  p_variable1: string;
  p_variable2: string;
  url_imagen : string;
  variable1: string;
  variable2: string;


  medidas: any =[];
  imagenes: string[];
  sistemas: any=[];


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public medidaService: ListaMedidasService,
    public storage: Storage,
    public db: AngularFireDatabase) {



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

    this.medidaService.getListaMaterialesbySistema(this.sistema).valueChanges()
    .subscribe(data =>{
      console.log(data);
      this.sistemas = data;

   
      //this.imagenes = Array(this.medidas.length);
      // for (var index = 0; index < this.medidas.length; index++) {
      //   console.log(this.medidas[index].nombre);
      //   this.imagenes[index] = `img/medidas/`+this.medidas[index].fondo;
      //   //this.generarFotos(index);
      //  }
    });


    
    }

  calcularMateriales(){
//Validacion de campos vacios
    if (this.variable1==undefined){
    alert("El valor del "+this.p_variable1+", no puede ir vacio. Ingrese un valor. ");
    return;
    }
    if (this.variable2==undefined){
      alert("El valor del "+this.p_variable2+", no puede ir vacio. Ingrese un valor. ");
       return;
      }
    if (isNaN(parseInt(this.variable1))){
      alert("El valor del "+this.p_variable1+", debe ser numerico. Ingrese un valor. ");
       return;
      }
    if (isNaN(parseInt(this.variable2))){
     alert("El valor del "+this.p_variable1+", debe ser numerico. Ingrese un valor. ");
      return;
     }
console.log("aqui estoy validando numero");
      console.log(parseInt(this.variable1));
      console.log(parseInt(this.variable2));

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
