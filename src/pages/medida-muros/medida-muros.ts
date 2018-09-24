import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ListaMedidasService } from '../../services/medidas/medida.service';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { ResultadoCalculoPage } from '../resultado-calculo/resultado-calculo';

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

  mtcuadrados: number;
  valorTotalC: number;
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
  materiales: any=[];
  


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public medidaService: ListaMedidasService,
    public storage: Storage,
    public db: AngularFireDatabase,
    private alertCtrl: AlertController) {

      this.mtcuadrados=0;
      this.valorTotalC=0;
      this.elemento= this.navParams.get('elemento');
      this.sistema= this.navParams.get('sistema');

      this.medidaService.getListaMedidasByelemento(this.elemento).valueChanges()
    .subscribe(data =>{
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
      this.materiales = data;

   
      //this.imagenes = Array(this.medidas.length);
      // for (var index = 0; index < this.medidas.length; index++) {
      //   console.log(this.medidas[index].nombre);
      //   this.imagenes[index] = `img/medidas/`+this.medidas[index].fondo;
      //   //this.generarFotos(index);
      //  }
    });


    
    }

  calcularMateriales(){
//Validacion de campos vacios y que sean valores numericos
this.mtcuadrados=0;
this.valorTotalC=0;

    if (this.variable1==undefined){
      const alert = this.alertCtrl.create({
        title: 'SiCMa',
        subTitle: 'El valor del '+this.p_variable1+', no puede ir vacio. Ingrese un valor. ',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
         
    if (this.variable2==undefined){
      const alert = this.alertCtrl.create({
        title: 'SiCMa',
        subTitle: 'El valor del '+this.p_variable2+', no puede ir vacio. Ingrese un valor. ',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    if (isNaN(parseInt(this.variable1))){
      const alert = this.alertCtrl.create({
        title: 'SiCMa',
        subTitle: 'El valor del '+this.p_variable1+', debe ser numerico. Ingrese un valor. ',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    if (isNaN(parseInt(this.variable2))){
      const alert = this.alertCtrl.create({
        title: 'SiCMa',
        subTitle: 'El valor del '+this.p_variable1+', debe ser numerico. Ingrese un valor. ',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    this.mtcuadrados=(parseFloat(this.variable1)*(parseFloat(this.variable2)));

    //Calculo de la cantidad total y el valor total
    for (var index = 0; index < this.materiales.length; index++) {
     
     var cantTotal= parseFloat((this.materiales[index].cantidadxM2))*(this.mtcuadrados);
     
      this.materiales[index].cantidadTotal=Math.ceil(cantTotal);
    
      this.materiales[index].valorTotal=(this.materiales[index].valor)*(this.materiales[index].cantidadTotal);
      this.valorTotalC+=this.materiales[index].valorTotal;   
     }
     this.abrirResultados(this.materiales, this.valorTotalC);
    }

    abrirResultados(materiales, valorTotalC){
 
     this.navCtrl.push(ResultadoCalculoPage, {materiales: materiales, valorTotalC: valorTotalC});
       
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
    this.mtcuadrados=0;
    this.valorTotalC=0;
  }

}
