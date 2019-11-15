import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  @ViewChild("acordeon") contenido: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public proyectoService: ProyectoService,
    public renderer: Renderer) {
    this.proyectoId = this.navParams.get('proyectoId');
    this.consultarDetalle();

  }

  ionViewDidLoad() {

  }

  consultarDetalle() {
    this.proyectoService.listarDetalleProyecto(this.proyectoId).valueChanges()
      .subscribe((dato) => {
        this.detalleProyecto = dato;
        dato.map((d, idx) => {
          this.proyectoService.listarMaterialesProyecto(d['id']).valueChanges()
            .subscribe((data) => {
              this.detalleProyecto[idx]['materiales'] = Object.keys(data[0]).map(function (key) {
                return data[0][key];
              });
            });
        })
        console.log('info', this.detalleProyecto);
      });
  }

  toggleAccordion() {
    console.log('aqui',this.accordionExpanded )
    if (this.accordionExpanded) {
      this.renderer.setElementStyle(this.contenido.nativeElement, "display", "none");
    } else {
      this.renderer.setElementStyle(this.contenido.nativeElement, "display", "block");

    }
    this.accordionExpanded = !this.accordionExpanded;
  }

  verImagenMaterial(material) {
    console.log('material ver', material);

  }

}
