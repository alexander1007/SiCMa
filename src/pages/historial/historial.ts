import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProyectoService } from '../../services/proyecto/proyecto.service';
import { Storage } from '@ionic/storage';
import { DetalleProyectoPage } from '../detalle-proyecto/detalle-proyecto';
import { InicioPage } from '../inicio/inicio';

/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  proyectos$: any;
  proyectos: any = [];
  usuarioId: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    public proyectoService: ProyectoService, public storage: Storage) {
    // obtenemos el id del usuario autenticado
    this.storage.get('idUsuario').then((val) => {
      this.usuarioId = val;
      this.consultarProyectos();
    });

  }

  ionViewDidLoad() {
  }

  consultarProyectos() {
    this.proyectoService.listarProyectosUsuario(this.usuarioId).valueChanges()
      .subscribe((data) => {
        this.proyectos = data;
        this.proyectos.sort(function (a, b) {
          return b.fecha.localeCompare(a.fecha);
        });
        this.initializeItems();
      });
  }
  // permite tener un arreglo paralelo para hacer los filtros
  initializeItems() {
    this.proyectos$ = this.proyectos;
  }
  // permite hacer el filtro del metodo buscar
  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    let q = searchbar.target.value;
    if (q && q.trim() != '') {
      this.proyectos$ = this.proyectos$.filter((item) => {
        return ((item.cliente.toLowerCase().indexOf(q.toLowerCase()) > -1) || (item.fecha.toLowerCase().indexOf(q.toLowerCase()) > -1) || (item.identificacion.toLowerCase().indexOf(q.toLowerCase()) > -1));

      });

    }
  }
  //
  abrirDetalleProyecto(proyectoId, cliente, identificacion) {
    this.navCtrl.push(DetalleProyectoPage, { proyectoId: proyectoId, cliente: cliente, identificacion: identificacion });
  }

  irAlInicio() {
    this.navCtrl.push(InicioPage);
  }

  confirmareQuitarProyecto(proyecto) {
    const alert = this.alertCtrl.create({
      title: 'PlaCMa',
      subTitle: '¿Está seguro que desea quitar este elemento?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.quitarProyecto(proyecto);
          }
        },
        {
          text: 'No'
        }
      ]
    });
    alert.present();
  }
  quitarProyecto(proyecto) {
    this.proyectoService.eliminarProyuecto(proyecto['id']);


  }
}
