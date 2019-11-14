import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProyectoService } from '../../services/proyecto/proyecto.service';
import { Storage } from '@ionic/storage';

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

  initializeItems() {
    this.proyectos$ = this.proyectos;
  }
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

}
