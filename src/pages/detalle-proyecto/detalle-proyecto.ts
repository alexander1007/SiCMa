import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProyectoService } from '../../services/proyecto/proyecto.service';

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
    public renderer: Renderer) {
    this.proyectoId = this.navParams.get('proyectoId');
    this.consultarDetalle();

  }



  consultarDetalle() {
    this.proyectoService.listarDetalleProyecto(this.proyectoId).valueChanges()
      .subscribe((dato) => {
        this.detalleProyecto = dato;
        dato.map((d, idx) => {
          this.proyectoService.listarMaterialesProyecto(d['id']).valueChanges()
            .subscribe((data) => {
              this.detalleProyecto[idx]['open'] = true;
              this.detalleProyecto[idx]['materiales'] = Object.keys(data[0]).map(function (key) {
                return data[0][key];
              });
            });
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


}
