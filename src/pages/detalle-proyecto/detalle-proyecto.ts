import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Navbar } from 'ionic-angular';
import { ProyectoService } from '../../services/proyecto/proyecto.service';
import { ElementoPage } from '../elemento/elemento';
import { Storage } from '@ionic/storage';
import { InicioPage } from '../inicio/inicio';
import { MedidaMurosPage } from '../medida-muros/medida-muros';
import { ProyectoPage } from '../proyecto/proyecto';
import { HistorialPage } from '../historial/historial';

/**
 * Generated class for the DetalleProyectoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-detalle-proyecto',
  templateUrl: 'detalle-proyecto.html',
})
export class DetalleProyectoPage {
  @ViewChild(Navbar) navBar: Navbar;
  identificacion: any;
  cliente: any;
  detalleProyecto: {}[] = [{
    elemmento: '',
    sistema: '',
    materiales: [],
    valorTotal: 0
  }
  ];
  proyectoId: any;
  accordionExpanded = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public proyectoService: ProyectoService,
    private alertCtrl: AlertController,
    private storage: Storage,
    public renderer: Renderer) {
    this.proyectoId = this.navParams.get('proyectoId');
    this.cliente = this.navParams.get('cliente');
    this.identificacion = this.navParams.get('identificacion');
    this.consultarDetalle();
  }

  ionViewDidLoad() {

    this.navBar.backButtonClick = (ev: UIEvent) => {
      this.navCtrl.push(HistorialPage);
    }

  }

  consultarDetalle() {
    this.proyectoService.listarDetalleProyecto(this.proyectoId).valueChanges()
      .subscribe((dato) => {
        this.detalleProyecto = dato;
        dato.map((d, idx) => {
          if (d['id'] != undefined) {
            this.proyectoService.listarMaterialesProyecto(d['id']).valueChanges()
              .subscribe((data) => {
                if (data.length > 0) {
                  this.detalleProyecto[idx]['open'] = true;
                  this.detalleProyecto[idx]['materiales'] = Object.keys(data[0]).map(function (key) {
                    return data[0][key];
                  });
                }

              });
          }
        })
      });
  }

  toggleAccordion(posicion) {
    this.detalleProyecto[posicion]['open'] = !this.detalleProyecto[posicion]['open'];
  }

  verImagenMaterial(material) {
    const alert = this.alertCtrl.create({
      title: material.descripcion,
      message: '<img class="img_card img-material" src=' + material.foto + '/> ',
      buttons: ['Aceptar']
    });
    alert.present();

  }

  confirmacion(mensaje) {
    const alert = this.alertCtrl.create({
      title: 'PlaCMa',
      subTitle: mensaje,
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.agregarElemento();
          }
        },
        {
          text: 'No'
        }
      ]
    });
    alert.present();
  }

  agregarElemento() {
    this.storage.set('idProyecto', this.proyectoId);
    this.navCtrl.push(ElementoPage, { cliente: this.cliente, identificacion: this.identificacion });
  }
  irAlInicio() {
    this.navCtrl.push(InicioPage);
  }

  editarDetalle(detalle) {
    this.navCtrl.push(MedidaMurosPage, { elemento: detalle.elemen, sistema: detalle.siste, editar: true, detalleId: detalle.id, idResultado: detalle.idResultado });

  }

  confirmareEditarDetalle(detalle) {
    const alert = this.alertCtrl.create({
      title: 'PlaCMa',
      subTitle: '¿Está seguro que desea editar las medidas de este elemento?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.editarDetalle(detalle);
          }
        },
        {
          text: 'No'
        }
      ]
    });
    alert.present();
  }

  confirmareQuitarDetalle(detalle) {
    const alert = this.alertCtrl.create({
      title: 'PlaCMa',
      subTitle: '¿Está seguro que desea quitar este elemento?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.quitarDetalle(detalle);
          }
        },
        {
          text: 'No'
        }
      ]
    });
    alert.present();
  }
  quitarDetalle(detalle) {
    this.proyectoService.eliminarResultado(detalle['idResultado']);
    this.proyectoService.eliminarDetalle(detalle['id']);


  }
}
