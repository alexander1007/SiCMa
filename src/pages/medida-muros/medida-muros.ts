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
  ancho: number;
  verVar3: boolean;

  medidas: any = [];
  recomendaciones: any = [];
  imagenes: string[];
  imagenesMateriales: string[];
  materiales: any = [];
  verVar4: boolean;
  resultadoTejas: any[];



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
        console.log('medida ', data);
        this.medidas = data;

        this.titulo = this.medidas[0].titulo;
        this.descripcion = this.medidas[0].descripcion;
        this.p_variable1 = this.medidas[0].variable1;
        this.p_variable2 = this.medidas[0].variable2;
        if (this.elemento == 'elemento4' || this.elemento == 'elemento6' || this.elemento == 'elemento3') {
          if (this.sistema == "sistema8") {
            this.verVar3 = false;
            this.verVar4 = true;
          } else { this.verVar3 = true; }

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
    this.ancho = 0;

    if (this.variable1 == undefined) {
      const alert = this.alertCtrl.create({
        title: 'SiCMa',
        subTitle: 'El valor del ' + this.p_variable1 + ', no puede ir vacio. Ingrese un valor. ',
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

    if (this.variable2 == undefined) {
      const alert = this.alertCtrl.create({
        title: 'SiCMa',
        subTitle: 'El valor del ' + this.p_variable2 + ', no puede ir vacio. Ingrese un valor. ',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    if (isNaN(parseInt(this.variable2))) {
      const alert = this.alertCtrl.create({
        title: 'SiCMa',
        subTitle: 'El valor del ' + this.p_variable2 + ', debe ser numerico. Ingrese un valor. ',
        buttons: ['OK']
      });
      alert.present();
      return;
    }



    if (this.verVar3 == true || this.verVar4 == true) {

      if (this.variable3 == undefined) {
        const alert = this.alertCtrl.create({
          title: 'SiCMa',
          subTitle: 'El valor del ' + this.p_variable3 + ', no puede ir vacio. Ingrese un valor. ',
          buttons: ['OK']
        });
        alert.present();
        return;
      }
      if (isNaN(parseInt(this.variable3))) {
        const alert = this.alertCtrl.create({
          title: 'SiCMa',
          subTitle: 'El valor del ' + this.p_variable3 + ', debe ser numerico. Ingrese un valor. ',
          buttons: ['OK']
        });
        alert.present();
        return;
      }

      if (this.sistema == 'sistema7' || this.sistema == 'sistema8' || this.sistema == 'sistema9' || this.sistema == 'sistema10') {

        if (this.sistema == 'sistema7') {
          this.variable3 = "1.40";
          this.ancho = (parseFloat(this.variable1) / 1);
          if (parseFloat(this.variable2) <= 5.9) {
            var cantAux = ((parseFloat(this.variable2) / 5.6) * this.ancho);
            var cantTotal = cantAux;
            console.log(cantAux);
          }
          if (parseFloat(this.variable2) > 5.9 && parseFloat(this.variable2) <= 11.8) {
            var cantAux = ((parseFloat(this.variable2) / 11.2) * this.ancho);
            var cantTotal = cantAux;
            console.log(cantAux);
          }
          if (parseFloat(this.variable2) > 11.8) {
            var real = (parseFloat(this.variable2) / 11.2);
            var cantAux = (parseFloat(this.variable2) / 11.2) - (Math.trunc(parseFloat(this.variable2) / 11.2));
            var totalL = ((Math.trunc(parseFloat(this.variable2) / 11.2)) * this.ancho);
            var cantAux2 = cantAux * 12.39;
            var cantAux3 = cantAux2 / 5.6 * this.ancho;
            var cantAux4 = cantAux3 - (Math.trunc(cantAux3));
            console.log("real");
            console.log(real);
            console.log("cantAux");
            console.log(cantAux);
            console.log("totalL");
            console.log(totalL);
            console.log("cantAux2");
            console.log(cantAux2);
            console.log("cantAux3");
            console.log(cantAux3);
            console.log("cantAux4");
            console.log(cantAux4);

            if (cantAux4 < 0.5) {
              cantTotal = Math.trunc(cantAux3);
            }

            console.log("tejas x 11.8m");
            console.log(real);
            console.log("cantidad de tejas total x 11.8m");
            console.log(totalL);
            console.log("tejascantidad de tejas total x 5.9m");
            console.log(cantAux3);
            console.log("cantidad de tejas total x 5.9m");
            console.log(cantTotal);

          }
          //Calculo de la cantidad total y el valor total
          for (var index = 0; index < this.materiales.length; index++) {

            this.materiales[index].cantidadTotal = totalL;
            this.materiales[index].cantidadTotal = cantAux3;




            // this.materiales[index].valorTotal = (this.materiales[index].valor) * (this.materiales[index].cantidadTotal);
            // this.materiales[index].valorTotalS = formatter.format(parseFloat(this.materiales[index].valorTotal)) // "$1,000.00" 
            // this.valorTotalC += this.materiales[index].valorTotal;

          }
        }

        if (this.sistema == 'sistema8') {

          this.ancho = (parseFloat(this.variable1) / 0.873);

          //solo para teja #4
          if (this.variable3 == "1.08") {
            var posicion = [2.91, 2.30, 1.69, 1.38, 1.08];
            this.resultadoTejas = this.calcularNumTejas(posicion);
          }

          if (parseFloat(this.variable3) == 1.15) {
            var posicion = [0, 2.30, 0, 0, 1.08];
            this.resultadoTejas = this.calcularNumTejas(posicion);
          }

          if (parseFloat(this.variable3) == 1.38) {
            var posicion = [2.91, 0, 1.69, 1.38, 0];
            this.resultadoTejas = this.calcularNumTejas(posicion);
          }

          if (parseFloat(this.variable3) == 1.46) {
            var posicion = [2.91, 0, 1.69, 0, 0];
            this.resultadoTejas = this.calcularNumTejas(posicion);
          }

          if (parseFloat(this.variable3) == 1.69) {
            var posicion = [0, 0, 1.69, 0, 0];
            this.resultadoTejas = this.calcularNumTejas(posicion);
          }

          console.log(this.resultadoTejas);

        }

        if (this.sistema == 'sistema9') {
          if (this.variable3 > "1.2") {
            const alert = this.alertCtrl.create({
              title: 'SiCMa',
              subTitle: 'El valor de la ' + this.p_variable3 + ', para este sistema es máximo 1.2m. ',
              buttons: ['OK']
            });
            alert.present();
            return;
          }
          this.ancho = (parseFloat(this.variable1) / 0.73);
        }

        if (this.sistema == 'sistema10') {
          if (this.variable3 > "1") {
            const alert = this.alertCtrl.create({
              title: 'SiCMa',
              subTitle: 'El valor de la ' + this.p_variable3 + ', para este sistema es máximo 1m. ',
              buttons: ['OK']
            });
            alert.present();
            return;
          }
          this.ancho = (parseFloat(this.variable1) / 0.873);
        }
      }

      else
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

      this.materiales[index].cantidadTotal = cantTotal;


      this.materiales[index].valorTotal = (this.materiales[index].valor) * (this.materiales[index].cantidadTotal);
      this.materiales[index].valorTotalS = formatter.format(parseFloat(this.materiales[index].valorTotal)) // "$1,000.00" 
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

  calcularNumTejas(posicion) {
    var resultado = [posicion.length];
    var resta;
    var calculo;
    var residuo;
    var aux = (parseFloat(this.variable2));

    for (var i = 0; i < posicion.length; i++) {
      console.log("primer if", aux);
      if (aux > 0) {
        console.log("debajo primer if", posicion[i]);
        if (posicion[i] > 0) {
          resta = aux - posicion[i];
          console.log("resta ", resta);

          if (resta > 0) {
            console.log("resta2 ", resta);
            if (resta >= 1) {
              calculo = aux / posicion[i];
              console.log('resultado ', calculo);

              resultado[i] = Math.trunc(calculo);
              if (resultado[i] > 0) {
                residuo = calculo - resultado[i];
                aux = residuo * posicion[i];
              }
              else {
                resultado[i] = 0;
              }
            }
            else {
              console.log("pone el mnensaje amor", aux);
              if ((posicion[i] - aux) < 0) {
                console.log('posicion', posicion[i - 1]);
                if (posicion[i - 1] > 0) {
                  console.log('resultado puto ', resultado[i - 1]);

                  resultado[i - 1] = (resultado[i - 1] / this.ancho) + 1;
                  console.log('resultado puto2 ', resultado[i - 1]);

                  resultado[i - 1] = resultado[i - 1] * (this.ancho);
                  console.log('resultado puto multiplicado ', resultado[i - 1]);

                  resultado[i] = 0;
                  aux = 0;
                }
                else {
                  console.log('suma ', parseFloat(resultado[i]) + 2);
                  if (resultado[i] > 0) {
                    resultado[i] = parseFloat(resultado[i]) + 2;
                  } else {
                    calculo = aux / posicion[i];
                    resultado[i] = Math.trunc(calculo);
                    if (resultado[i] > 0) {
                      residuo = calculo - resultado[i];
                      aux = residuo * posicion[i];
                    }
                    else {
                      resultado[i] = 0;
                    }
                  }
                }
              }
              else {
                resultado[i] = 0;
              }
            }
          }

          else {
            console.log("variable2", this.variable2, posicion[4]);

            if (this.variable2 < posicion[4]) {
              if (i == 4) {
                console.log("entra al 4");
                resultado[4] = 1;
                aux = 0;

              } else {
                resultado[i] = 0;
              }

            }
            else {
              resultado[i] = 1;
              aux = 0;
            }

          }
        }
        else {
          resultado[i] = 0;
        }
      }
      else {
        resultado[i] = 0;
      }
      resultado[i] = resultado[i] * (this.ancho);
    }
    return resultado;
  }



  ionViewDidLoad() {
    this.mtcuadrados = 0;
    this.valorTotalC = 0;
    this.verVar3 = false;

  }

}
