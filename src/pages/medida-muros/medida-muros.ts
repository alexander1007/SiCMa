import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { ListaMedidasService } from '../../services/medidas/medida.service';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { ResultadoCalculoPage } from '../resultado-calculo/resultado-calculo';
import { ListaRecomendacionesService } from '../../services/recomendaciones/recomendacion.service';
import { ProyectoService } from '../../services/proyecto/proyecto.service';
interface info {
  idProyecto: string,
  idUsuario: string,
  elemento: string,
  sistema: string
}
@IonicPage()
@Component({
  selector: 'page-medida-muros',
  templateUrl: 'medida-muros.html',
})
export class MedidaMurosPage {

  idDetalle: any;
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
  info: info;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public medidaService: ListaMedidasService,
    public recomendacionService: ListaRecomendacionesService,
    public storage: Storage,
    public db: AngularFireDatabase,
    private alertCtrl: AlertController,
    public menu: MenuController,
    public proyectoService: ProyectoService) {
    this.verVar3 = false;
    this.menu1Active();

    this.mtcuadrados = 0;
    this.valorTotalC = 0;
    this.elemento = this.navParams.get('elemento');
    this.sistema = this.navParams.get('sistema');
    this.info = this.navParams.get('infoSave');



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
        title: 'PlaCMa',
        subTitle: 'El valor del ' + this.p_variable1 + ', no puede ir vacio. Ingrese un valor. ',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    if (this.variable2 == undefined) {
      const alert = this.alertCtrl.create({
        title: 'PlaCMa',
        subTitle: 'El valor del ' + this.p_variable2 + ', no puede ir vacio. Ingrese un valor. ',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    if (isNaN(parseInt(this.variable1))) {
      const alert = this.alertCtrl.create({
        title: 'PlaCMa',
        subTitle: 'El valor del ' + this.p_variable1 + ', debe ser numerico. Ingrese un valor. ',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    if (isNaN(parseInt(this.variable2))) {
      const alert = this.alertCtrl.create({
        title: 'PlaCMa',
        subTitle: 'El valor del ' + this.p_variable1 + ', debe ser numerico. Ingrese un valor. ',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    // se crea variable para el almacenamiento
    var infoSave = {
      idProyecto: this.info.idProyecto,
      idUsuario: this.info.idUsuario,
      elemento: this.info.elemento,
      sistema: this.info.sistema,
      p_variable1: this.p_variable1,
      p_variable2: this.p_variable2,
      p_variable3: '',
      variable1: this.variable1,
      variable2: this.variable2,
      variable3: '',
      valorTotal: ''
    }
    if (this.verVar3 == true) {
      //logica de la variable 3
      infoSave.p_variable3 = this.p_variable3;
      infoSave.variable3 = this.variable3
      this.mtcuadrados = (parseFloat(this.variable1) * (parseFloat(this.variable2)) * (parseFloat(this.variable3)));
    }
    else {
      this.mtcuadrados = (parseFloat(this.variable1) * (parseFloat(this.variable2)));
    }
    // guardamos los datos del detalle del proyecto
    this.guardarDetalle(infoSave);

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
      this.materiales[index].idDetalle = this.idDetalle;
    }
    // actualizar valor total presupuesto
    this.agregarValorTotal(infoSave, this.valorTotalC);
    // guarda la data resultad del calculo
    this.guardarResultado(this.materiales);
    // abre la pantalla que permite mostrar los materiales necesarios
    this.abrirResultados(this.materiales, this.valorTotalC, this.recomendaciones);

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

  /**
   * funcion que permite guardar la info del detalle del proyecto
   * Se obtiene el id del detalle
   * @param infoSave Arreglo con la info para el detalle del proyecto
   * 
   */
  guardarDetalle(infoSave) {
    this.idDetalle = this.proyectoService.guardarProyectoDetalle(infoSave);
  }
  /**
   * funcion que permite guardar la info del detalle del proyecto
   * Se obtiene el id del detalle
   * @param infoMateriales Arreglo con la info para el resultado del proyecto
   * 
   */
  guardarResultado(infoMateriales) {
    this.proyectoService.guardarResultadoProyecto(infoMateriales);
  }
  /**
   * funcion que permite actuaizar o agregar el valor del presupuesto total
   * al detalle del proyecto
   * @param valorTotal Valor total presupuesto
   * 
   */
  agregarValorTotal(infoSave, valorTotal) {
    infoSave.valorTotal = valorTotal;
    this.proyectoService.actualizarValorDetalle(infoSave);

  }
}
