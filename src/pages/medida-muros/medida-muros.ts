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
  resultadoTejas: any[] = [0, 0, 0, 0, 0, 0, 0, 0];
  resultadoTejasTerm: any[] = [0, 0, 0, 0, 0, 0, 0, 0];
  resultadoTejasFibr: any[] = [0, 0, 0, 0, 0, 0, 0, 0];
  resultadoTejasArq: any[] = [0, 0, 0, 0, 0, 0, 0, 0];
  resultadoTejasPVC: any[] = [0, 0, 0, 0, 0, 0, 0, 0];



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
    if (this.sistema == 'sistema7' || this.sistema == 'sistema8' || this.sistema == 'sistema9' || this.sistema == 'sistema10') {
      const alert = this.alertCtrl.create({
        title: 'PlaCMa',
        subTitle: 'El LARGO es la medida que va en el mismo sentido de la caida del agua, es muy importante ingresar esta medida correctamente',
        buttons: ['OK']
      });
      alert.present();
    }


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
        title: 'PlaCMa',
        subTitle: 'El valor del ' + this.p_variable1 + ', no puede ir vacio. Ingrese un valor. ',
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

    if (parseFloat(this.variable1) <= 0) {
      const alert = this.alertCtrl.create({
        title: 'PlaCMa',
        subTitle: 'El valor del ' + this.p_variable1 + ', debe ser mayor que 0. ',
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

    if (isNaN(parseInt(this.variable2))) {
      const alert = this.alertCtrl.create({
        title: 'PlaCMa',
        subTitle: 'El valor del ' + this.p_variable2 + ', debe ser numerico. Ingrese un valor. ',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    if (parseFloat(this.variable2) <= 0) {
      const alert = this.alertCtrl.create({
        title: 'PlaCMa',
        subTitle: 'El valor del ' + this.p_variable2 + ', debe ser mayor que 0. ',
        buttons: ['OK']
      });
      alert.present();
      return;
    }


    if (this.verVar3 == true || this.verVar4 == true) {

      if (this.variable3 == undefined) {
        const alert = this.alertCtrl.create({
          title: 'PlaCMa',
          subTitle: 'El valor del ' + this.p_variable3 + ', no puede ir vacio. Ingrese un valor. ',
          buttons: ['OK']
        });
        alert.present();
        return;
      }
      if (isNaN(parseInt(this.variable3))) {
        const alert = this.alertCtrl.create({
          title: 'PlaCMa',
          subTitle: 'El valor del ' + this.p_variable3 + ', debe ser numerico. Ingrese un valor. ',
          buttons: ['OK']
        });
        alert.present();
        return;
      }

      if (parseFloat(this.variable3) <= 0) {
        const alert = this.alertCtrl.create({
          title: 'PlaCMa',
          subTitle: 'El valor del ' + this.p_variable3 + ', debe ser mayor que 0. ',
          buttons: ['OK']
        });
        alert.present();
        return;
      }


      if (this.sistema == 'sistema7' || this.sistema == 'sistema8' || this.sistema == 'sistema9' || this.sistema == 'sistema10') {

        if (this.sistema == 'sistema7') {
          if (parseFloat(this.variable3) <= 1.40) {
            this.ancho = (parseFloat(this.variable1) / 1);
            var posicion = [11.65, 5.75, 0, 0, 0, 0, 0, 0];
            this.resultadoTejasTerm = this.calcularNumTejas(posicion);
          }
          else {
            const alert = this.alertCtrl.create({
              title: 'PlaCMa',
              subTitle: 'El valor de la ' + this.p_variable3 + ', debe ser menor o igual a 1.40m. ',
              buttons: ['OK']
            });
            alert.present();
            return;
          }
        }

        if (this.sistema == 'sistema8') {

          this.ancho = (parseFloat(this.variable1) / 0.873);

          //solo para teja #4
          if (parseFloat(this.variable3) == 1.08) {
            var posicion = [0, 0, 0, 2.91, 2.30, 1.69, 1.38, 1.08];
            this.resultadoTejas = this.calcularNumTejas(posicion);
          }

          if (parseFloat(this.variable3) == 1.15) {
            var posicion = [0, 0, 0, 2.91, 2.30, 1.69, 1.38, 0];
            this.resultadoTejas = this.calcularNumTejas(posicion);
          }

          if (parseFloat(this.variable3) == 1.38) {
            var posicion = [0, 0, 0, 2.91, 0, 1.69, 1.38, 0];
            this.resultadoTejas = this.calcularNumTejas(posicion);
          }

          if (parseFloat(this.variable3) == 1.46) {
            var posicion = [0, 0, 0, 2.91, 0, 1.69, 0, 0];
            this.resultadoTejas = this.calcularNumTejas(posicion);
          }

          if (parseFloat(this.variable3) == 1.69) {
            var posicion = [0, 0, 0, 0, 0, 1.69, 0, 0];
            this.resultadoTejasFibr = this.calcularNumTejas(posicion);
          }
        }

        if (this.sistema == 'sistema9') {
          if (parseFloat(this.variable3) > 1.2) {
            const alert = this.alertCtrl.create({
              title: 'SiCMa',
              subTitle: 'El valor de la ' + this.p_variable3 + ', debe ser menor igual a 1.2m. ',
              buttons: ['OK']
            });
            alert.present();
            return;
          } else {
            this.ancho = (parseFloat(this.variable1) / 0.73);
            var posicion = [0, 0, 5.80, 4.80, 3.80, 3.46, 2.85, 2.24];
            this.resultadoTejasArq = this.calcularNumTejas(posicion);
          }
        }

        if (this.sistema == 'sistema10') {
          if (parseFloat(this.variable3) > 1) {
            const alert = this.alertCtrl.create({
              title: 'SiCMa',
              subTitle: 'El valor de la ' + this.p_variable3 + ', debe ser menor igual a 1.0m. ',
              buttons: ['OK']
            });
            alert.present();
            return;
          }
          else {
            this.ancho = (parseFloat(this.variable1) / 0.873);
            var posicion = [0, 0, 0, 2.91, 2.30, 1.69, 1.38, 1.08];
            this.resultadoTejasPVC = this.calcularNumTejas(posicion);
          }
        }
        this.mtcuadrados = (parseFloat(this.variable1) * (parseFloat(this.variable2)));
      }

      else {
        //logica de la variable 3
        this.mtcuadrados = (parseFloat(this.variable1) * (parseFloat(this.variable2)) * (parseFloat(this.variable3)));
      }
    }

    else {
      this.mtcuadrados = (parseFloat(this.variable1) * (parseFloat(this.variable2)));
    }


    //Calculo de la cantidad total y el valor total
    for (var index = 0; index < this.materiales.length; index++) {
      //SIstema 7 teja termoacustica
      if (this.materiales[index].key == "material94") {
        this.materiales[index].cantidadTotal = this.resultadoTejasTerm[1];
        this.generarResultados(index);
      }
      else {
        if (this.materiales[index].key == "material95") {
          this.materiales[index].cantidadTotal = this.resultadoTejasTerm[0];
          this.generarResultados(index);
        }
        else {
          //sistema 8 teja fibrocemento
          if (this.materiales[index].key == "material96") {
            this.materiales[index].cantidadTotal = this.resultadoTejasFibr[7];
            this.generarResultados(index);
          }
          else {
            if (this.materiales[index].key == "material97") {
              this.materiales[index].cantidadTotal = this.resultadoTejasFibr[6];
              this.generarResultados(index);
            }
            else {
              if (this.materiales[index].key == "material98") {
                this.materiales[index].cantidadTotal = this.resultadoTejasFibr[5];
                this.generarResultados(index);
              }
              else {
                if (this.materiales[index].key == "material99") {
                  this.materiales[index].cantidadTotal = this.resultadoTejasFibr[4];
                  this.generarResultados(index);
                }
                else {
                  if (this.materiales[index].key == "material100") {
                    this.materiales[index].cantidadTotal = this.resultadoTejasFibr[3];
                    this.generarResultados(index);
                  }
                  else {
                    //Sistema 9 teja arq metalica
                    if (this.materiales[index].key == "material101") {
                      this.materiales[index].cantidadTotal = this.resultadoTejasArq[7];
                      this.generarResultados(index);
                    }
                    else {
                      if (this.materiales[index].key == "material102") {
                        this.materiales[index].cantidadTotal = this.resultadoTejasArq[6];
                        this.generarResultados(index);
                      }
                      else {
                        if (this.materiales[index].key == "material103") {
                          this.materiales[index].cantidadTotal = this.resultadoTejasArq[5];
                          this.generarResultados(index);
                        }
                        else {
                          if (this.materiales[index].key == "material104") {
                            this.materiales[index].cantidadTotal = this.resultadoTejasArq[4];
                            this.generarResultados(index);
                          }
                          else {
                            if (this.materiales[index].key == "material105") {
                              this.materiales[index].cantidadTotal = this.resultadoTejasArq[3];
                              this.generarResultados(index);
                            }
                            else {
                              if (this.materiales[index].key == "material107") {
                                this.materiales[index].cantidadTotal = this.resultadoTejasArq[2];
                                this.generarResultados(index);
                              }
                              else {
                                //sistema10 teja pvc traslucido
                                if (this.materiales[index].key == "material108") {
                                  this.materiales[index].cantidadTotal = this.resultadoTejasPVC[7];
                                  this.generarResultados(index);
                                }
                                else {
                                  if (this.materiales[index].key == "material109") {
                                    this.materiales[index].cantidadTotal = this.resultadoTejasPVC[6];
                                    this.generarResultados(index);
                                  }
                                  else {
                                    if (this.materiales[index].key == "material110") {
                                      this.materiales[index].cantidadTotal = this.resultadoTejasPVC[5];
                                      this.generarResultados(index);
                                    }
                                    else {
                                      if (this.materiales[index].key == "material111") {
                                        this.materiales[index].cantidadTotal = this.resultadoTejasPVC[4];
                                        this.generarResultados(index);
                                      }
                                      else {
                                        if (this.materiales[index].key == "material112") {
                                          this.materiales[index].cantidadTotal = this.resultadoTejasPVC[3];
                                          this.generarResultados(index);
                                        }
                                        else {
                                          console.log('mat no teja', this.materiales[index]);

                                          var cantTotal = parseFloat((this.materiales[index].cantidadxM2)) * (this.mtcuadrados);
                                          this.materiales[index].cantidadTotal = cantTotal;
                                          this.generarResultados(index);
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }



    }

    this.recomendacionService.getListaRecomendacionesxsistema(this.sistema).valueChanges()
      .subscribe(data => {
        this.recomendaciones = data;

        //se debe enviar las recomendaciones por parametro
        this.abrirResultados(this.materiales, this.valorTotalC, this.recomendaciones);
      });


  }
  generarResultados(index) {
    //declaracion de moneda
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });

    this.materiales[index].valorTotal = (this.materiales[index].valor) * (this.materiales[index].cantidadTotal);
    this.materiales[index].valorTotalS = formatter.format(parseFloat(this.materiales[index].valorTotal)) // "$1,000.00" 
    this.valorTotalC += this.materiales[index].valorTotal;

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
