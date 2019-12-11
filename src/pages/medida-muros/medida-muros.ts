import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController, Navbar } from 'ionic-angular';
import { ListaMedidasService } from '../../services/medidas/medida.service';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { ResultadoCalculoPage } from '../resultado-calculo/resultado-calculo';
import { ListaRecomendacionesService } from '../../services/recomendaciones/recomendacion.service';
import { ProyectoService } from '../../services/proyecto/proyecto.service';
import { SistemasPage } from '../sistemas/sistemas';
import { InicioPage } from '../inicio/inicio';
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
  identificacion: any;
  cliente: any;
  usuarioId: any;
  proyectoId: any;
  @ViewChild(Navbar) navBar: Navbar;
  idResultado: string;
  idDetalle: any;
  mtcuadrados: number;
  valorTotalC: number;
  sistema: any;
  elemento: any;
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
  info: info;
  editar: boolean = false;
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
    public menu: MenuController,
    public proyectoService: ProyectoService) {
    this.verVar3 = false;
    this.menu1Active();

    this.mtcuadrados = 0;
    this.valorTotalC = 0;
    this.elemento = this.navParams.get('elemento');
    this.sistema = this.navParams.get('sistema');

    this.editar = this.navParams.get('editar');
    this.cliente = this.navParams.get('cliente');
    this.identificacion = this.navParams.get('identificacion');
    // obtenemos el id del proyecto creado
    this.storage.get('idProyecto').then((val) => {
      this.proyectoId = val;
    });
    // obtenemos el id del usuario autenticado
    this.storage.get('idUsuario').then((val) => {
      this.usuarioId = val;
    });
    if (this.editar) {
      this.idDetalle = this.navParams.get('detalleId');
      this.idResultado = this.navParams.get('idResultado');
      this.eliminarCalculo(this.idResultado);
    }
    this.info = this.navParams.get('infoSave');

    if (this.sistema['key'] == 'sistema7' || this.sistema['key'] == 'sistema8' || this.sistema['key'] == 'sistema9' || this.sistema['key'] == 'sistema10') {
      const alert = this.alertCtrl.create({
        title: 'PlaCMa',
        subTitle: 'El Largo es la medida que va en el mismo sentido de la caida del agua, es muy importante ingresar esta medida correctamente',
        buttons: ['OK']
      });
      alert.present();
    }


    this.medidaService.getListaMedidasByelemento(this.elemento).valueChanges()
      .subscribe(data => {
        this.medidas = data;

        this.titulo = this.medidas[0].titulo;
        this.descripcion = this.medidas[0].descripcion;
        this.p_variable1 = this.medidas[0].variable1;
        this.p_variable2 = this.medidas[0].variable2;
        if (this.elemento['key'] == 'elemento4' || this.elemento['key'] == 'elemento6' || this.elemento['key'] == 'elemento3') {
          if (this.sistema['key'] == "sistema8") {
            this.verVar3 = false;
            this.verVar4 = true;
          } else { this.verVar3 = true; }

          this.p_variable3 = this.medidas[0].variable3;
        }
        this.imagenes = Array(this.medidas.length);
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
    // se crea variable para el almacenamiento
    var infoSave;
    if (!this.editar) {
      infoSave = {
        idProyecto: this.info.idProyecto,
        idUsuario: this.info.idUsuario,
        elemento: this.info.elemento,
        elemen: this.elemento,
        sistema: this.info.sistema,
        siste: this.sistema,
        p_variable1: this.p_variable1,
        p_variable2: this.p_variable2,
        p_variable3: '',
        variable1: this.variable1,
        variable2: this.variable2,
        variable3: '',
        valorTotal: ''
      }
    } else {

      infoSave = {
        idProyecto: this.proyectoId,
        idUsuario: this.usuarioId,
        elemento: this.elemento['nombre'],
        elemen: this.elemento,
        sistema: this.sistema['nombre'],
        siste: this.sistema,
        p_variable1: this.p_variable1,
        p_variable2: this.p_variable2,
        p_variable3: '',
        variable1: this.variable1,
        variable2: this.variable2,
        variable3: '',
        valorTotal: ''
      }
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


      if (this.sistema['key'] == 'sistema7' || this.sistema['key'] == 'sistema8' || this.sistema['key'] == 'sistema9' || this.sistema['key'] == 'sistema10') {

        if (this.sistema['key'] == 'sistema7') {
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

        if (this.sistema['key'] == 'sistema8') {

          this.ancho = (parseFloat(this.variable1) / 0.873);

          //solo para teja #4
          if (parseFloat(this.variable3) == 1.08) {
            var posicion = [0, 0, 0, 2.91, 2.30, 1.69, 1.38, 1.08];
            this.resultadoTejasFibr = this.calcularNumTejas(posicion);
          }

          if (parseFloat(this.variable3) == 1.15) {
            var posicion = [0, 0, 0, 2.91, 2.30, 1.69, 1.38, 0];
            this.resultadoTejasFibr = this.calcularNumTejas(posicion);
          }

          if (parseFloat(this.variable3) == 1.38) {
            var posicion = [0, 0, 0, 2.91, 0, 1.69, 1.38, 0];
            this.resultadoTejasFibr = this.calcularNumTejas(posicion);
          }

          if (parseFloat(this.variable3) == 1.46) {
            var posicion = [0, 0, 0, 2.91, 0, 1.69, 0, 0];
            this.resultadoTejasFibr = this.calcularNumTejas(posicion);
          }

          if (parseFloat(this.variable3) == 1.69) {
            var posicion = [0, 0, 0, 0, 0, 1.69, 0, 0];
            this.resultadoTejasFibr = this.calcularNumTejas(posicion);
          }
        }

        if (this.sistema['key'] == 'sistema9') {
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

        if (this.sistema['key'] == 'sistema10') {
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
    // guardamos los datos del detalle del proyecto
    if (!this.editar) {
      this.guardarDetalle(infoSave);
    }



    //Calculo de la cantidad total y el valor total
    for (var index = 0; index < this.materiales.length; index++) {
      //SIstema 7 teja termoacustica
      if (this.materiales[index].key == "material94") {
        this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasTerm[1]).toFixed(2);
        this.generarResultados(index);
      }
      else {
        if (this.materiales[index].key == "material95") {
          this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasTerm[0]).toFixed(2);
          this.generarResultados(index);
        }
        else {
          //sistema 8 teja fibrocemento
          if (this.materiales[index].key == "material96") {
            this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasFibr[7]).toFixed(2);
            this.generarResultados(index);
          }
          else {
            if (this.materiales[index].key == "material97") {
              this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasFibr[6]).toFixed(2);
              this.generarResultados(index);
            }
            else {
              if (this.materiales[index].key == "material98") {
                this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasFibr[5]).toFixed(2);
                this.generarResultados(index);
              }
              else {
                if (this.materiales[index].key == "material99") {
                  this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasFibr[4]).toFixed(2);
                  this.generarResultados(index);
                }
                else {
                  if (this.materiales[index].key == "material100") {
                    this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasFibr[3]).toFixed(2);
                    this.generarResultados(index);
                  }
                  else {
                    //Sistema 9 teja arq metalica
                    if (this.materiales[index].key == "material101") {
                      this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasArq[7]).toFixed(2);
                      this.generarResultados(index);
                    }
                    else {
                      if (this.materiales[index].key == "material102") {
                        this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasArq[6]).toFixed(2);
                        this.generarResultados(index);
                      }
                      else {
                        if (this.materiales[index].key == "material103") {
                          this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasArq[5]).toFixed(2);
                          this.generarResultados(index);
                        }
                        else {
                          if (this.materiales[index].key == "material104") {
                            this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasArq[4]).toFixed(2);
                            this.generarResultados(index);
                          }
                          else {
                            if (this.materiales[index].key == "material105") {
                              this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasArq[3]).toFixed(2);
                              this.generarResultados(index);
                            }
                            else {
                              if (this.materiales[index].key == "material107") {
                                this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasArq[2]).toFixed(2);
                                this.generarResultados(index);
                              }
                              else {
                                //sistema10 teja pvc traslucido
                                if (this.materiales[index].key == "material108") {
                                  this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasPVC[7]).toFixed(2);
                                  this.generarResultados(index);
                                }
                                else {
                                  if (this.materiales[index].key == "material109") {
                                    this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasPVC[6]).toFixed(2);
                                    this.generarResultados(index);
                                  }
                                  else {
                                    if (this.materiales[index].key == "material110") {
                                      this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasPVC[5]).toFixed(2);
                                      this.generarResultados(index);
                                    }
                                    else {
                                      if (this.materiales[index].key == "material111") {
                                        this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasPVC[4]).toFixed(2);
                                        this.generarResultados(index);
                                      }
                                      else {
                                        if (this.materiales[index].key == "material112") {
                                          this.materiales[index].cantidadTotal = parseFloat(this.resultadoTejasPVC[3]).toFixed(2);
                                          this.generarResultados(index);
                                        }
                                        else {

                                          var cantTotal = parseFloat((this.materiales[index].cantidadxM2)) * (this.mtcuadrados);
                                          this.materiales[index].cantidadTotal = cantTotal.toFixed(2);
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
    // actualizar valor total presupuesto
    this.agregarValorTotal(infoSave, this.valorTotalC);
    // guarda la data resultad del calculo
    this.guardarResultado(this.materiales, infoSave);
    // abre la pantalla que permite mostrar los materiales necesarios
    this.abrirResultados(this.materiales, this.valorTotalC, this.recomendaciones);

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

    this.navCtrl.push(ResultadoCalculoPage, {
      materiales: materiales, valorTotalC: valorTotalC,
      recomendaciones: recomendaciones, detalleId: this.idDetalle, idResultado: this.idResultado,
      elemento: this.elemento, sistema: this.sistema, cliente: this.cliente, identificacion: this.identificacion, proyectoId: this.proyectoId
    });

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
    this.navBar.backButtonClick = (ev: UIEvent) => {
      this.eliminarDetalle(this.idDetalle);
      this.navCtrl.push(SistemasPage, { elemento: this.elemento, editar: true });
    }

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
  guardarResultado(infoMateriales, infoSave) {
    this.idResultado = this.proyectoService.guardarResultadoProyecto(infoMateriales, this.idDetalle);
    infoSave.idResultado = this.idResultado;
    this.proyectoService.actualizarValorDetalle(infoSave);

  }
  /**
   * funcion que permite actuaizar o agregar el valor del presupuesto total
   * al detalle del proyecto
   * @param valorTotal Valor total presupuesto
   * 
   */
  agregarValorTotal(infoSave, valorTotal) {
    if (this.editar) {
      infoSave.id = this.idDetalle;
    }
    infoSave.valorTotal = valorTotal;
    this.proyectoService.actualizarValorDetalle(infoSave);

  }

  eliminarDetalle(idDetalle) {
    this.proyectoService.eliminarDetalle(idDetalle);
  }

  eliminarCalculo(idResultado) {
    this.proyectoService.eliminarResultado(idResultado);

  }
  irAlInicio() {
    this.navCtrl.push(InicioPage);
  }
}
