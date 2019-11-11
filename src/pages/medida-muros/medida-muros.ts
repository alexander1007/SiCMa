import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { ListaMedidasService } from '../../services/medidas/medida.service';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { ResultadoCalculoPage } from '../resultado-calculo/resultado-calculo';
import { ListaRecomendacionesService } from '../../services/recomendaciones/recomendacion.service';

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
  p_variable3: string;
  url_imagen: string;
  variable1: string;
  variable2: string;
  variable3: string;
  verVar3: boolean;

  medidas: any = [];
  recomendaciones: any = [];
  imagenes: string[];
  imagenesMateriales: string[];
  materiales: any = [];



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public medidaService: ListaMedidasService,
    public recomendacionService: ListaRecomendacionesService,
    public storage: Storage,
    public db: AngularFireDatabase,
    private alertCtrl: AlertController,
    public menu: MenuController) {
    this.verVar3 = false;
    this.menu1Active();

    this.mtcuadrados = 0;
    this.valorTotalC = 0;
    this.elemento = this.navParams.get('elemento');
    this.sistema = this.navParams.get('sistema');


    this.medidaService.getListaMedidasByelemento(this.elemento).valueChanges()
      .subscribe(data => {
        this.medidas = data;

        this.titulo = this.medidas[0].titulo;
        this.descripcion = this.medidas[0].descripcion;
        this.p_variable1 = this.medidas[0].variable1;
        this.p_variable2 = this.medidas[0].variable2;
        if (this.elemento == 'elemento4' || this.elemento == 'elemento6') {
          this.verVar3 = true;
          this.p_variable3 = this.medidas[0].variable3;
        }
        this.imagenes = Array(this.medidas.length);
        //  for (var index = 0; index < this.medidas.length; index++) {
        this.imagenes[0] = `img/medidas/` + this.medidas[0].imagen;
        this.generarFotos(0);
        // }
      });

    this.medidaService.getListaMaterialesbySistema(this.sistema).valueChanges()
      .subscribe(data => {
        this.materiales = data;
        this.materiales.sort(function (a, b) {
          return a.descripcion.localeCompare(b.descripcion);
        });
        // imagenes de los materiales
        this.imagenesMateriales = Array(this.materiales.length);
        for (var index = 0; index < this.materiales.length; index++) {
          this.imagenes[index] = `img/materiales/` + this.materiales[index].imagen;
          this.generarFotosMateriales(index);
        }
      });



  }

  //esto es para desactivar los menu en la pantalla login
  menu1Active() {
    this.menu.enable(false);
  }
  calcularMateriales() {
    //Validacion de campos vacios y que sean valores numericos
    this.mtcuadrados = 0;
    this.valorTotalC = 0;

    if (this.variable1 == undefined) {
      const alert = this.alertCtrl.create({
        title: 'SiCMa',
        subTitle: 'El valor del ' + this.p_variable1 + ', no puede ir vacio. Ingrese un valor. ',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    if (this.variable2 == undefined) {
      const alert = this.alertCtrl.create({
        title: 'SiCMa',
        subTitle: 'El valor del ' + this.p_variable2 + ', no puede ir vacio. Ingrese un valor. ',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    if (isNaN(parseInt(this.variable1))) {
      const alert = this.alertCtrl.create({
        title: 'SiCMa',
        subTitle: 'El valor del ' + this.p_variable1 + ', debe ser numerico. Ingrese un valor. ',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    if (isNaN(parseInt(this.variable2))) {
      const alert = this.alertCtrl.create({
        title: 'SiCMa',
        subTitle: 'El valor del ' + this.p_variable1 + ', debe ser numerico. Ingrese un valor. ',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    if (this.verVar3 == true) {
      //logica de la variable 3

      this.mtcuadrados = (parseFloat(this.variable1) * (parseFloat(this.variable2)) * (parseFloat(this.variable3)));
    }
    else {
      this.mtcuadrados = (parseFloat(this.variable1) * (parseFloat(this.variable2)));
    }

    //declaracion de moneda
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });
    //Calculo de la cantidad total y el valor total
    for (var index = 0; index < this.materiales.length; index++) {

      var cantTotal = parseFloat((this.materiales[index].cantidadxM2)) * (this.mtcuadrados);

      this.materiales[index].cantidadTotal = cantTotal.toFixed(2);


      this.materiales[index].valorTotal = (this.materiales[index].valor) * (this.materiales[index].cantidadTotal);
      this.materiales[index].valorTotalS = formatter.format(parseFloat(this.materiales[index].valorTotal)); // "$1,000.00" 
      this.valorTotalC += this.materiales[index].valorTotal;

    }

    this.recomendacionService.getListaRecomendacionesxsistema(this.sistema).valueChanges()
      .subscribe(data => {
        this.recomendaciones = data;

        //se debe enviar las recomendaciones por parametro
        this.abrirResultados(this.materiales, this.valorTotalC, this.recomendaciones);
      });


  }

  abrirResultados(materiales, valorTotalC, recomendaciones) {

    this.navCtrl.push(ResultadoCalculoPage, { materiales: materiales, valorTotalC: valorTotalC, recomendaciones: recomendaciones });

  }

  generarFotos(index) {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(this.imagenes[index]);
    imageRef.getDownloadURL().then(url => {
      this.imagenes[index] = url;
      this.medidas[index].foto = url;
      this.url_imagen = this.medidas[0].foto;
    })
  }

  generarFotosMateriales(index) {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(this.imagenes[index]);
    imageRef.getDownloadURL().then(url => {
      this.imagenesMateriales[index] = url;
      this.materiales[index].foto = url;
    })
  }



  ionViewDidLoad() {
    this.mtcuadrados = 0;
    this.valorTotalC = 0;
    this.verVar3 = false;

  }

}
