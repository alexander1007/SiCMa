import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PedidoPage } from '../pedido/pedido';
import { ListaInventariosService } from '../../services/inventario/inventario.service';
import * as moment from 'moment';

/**
 * Generated class for the InventarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventario',
  templateUrl: 'inventario.html',
})
export class InventarioPage {

  identificacion: any;
  cliente: any;
  productosAgregados: any[];
  productos$: any;
  pedido: any = [];
  producto: string;
  productos: any = [];
  fecha: any;
  hora: any;
  tiempo: string;
  idInv: string;
  vacio: boolean = true;
  filtro: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    public inventariosService: ListaInventariosService) {

    this.productosAgregados = [];

    this.inventariosService.getListaInventarios().valueChanges()
      .subscribe(data => {
        console.log(data);
        this.productos = data;
        this.productos.sort(function (a, b) {
          return a.nombre.localeCompare(b.nombre);
        });
        this.initializeItems();
      })
  }

  ionViewDidLoad() {
    this.agregarCliente(false);
  }

  initializeItems() {
    this.productos$ = this.productos;
  }

  getItems(ev) {
    this.initializeItems();
    var val = ev.target.value;
    if (val && val.trim() != '') {
      if (this.filtro) {
        this.productos$ = this.productos.filter((item) => {
          return (((item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.descripcion.toLowerCase().indexOf(val.toLowerCase()) > -1)) && item.add == true);
        })
      } else {
        this.productos$ = this.productos.filter((item) => {
          return ((item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.descripcion.toLowerCase().indexOf(val.toLowerCase()) > -1));
        })
      }

    }
  }

  agregarProducto(producto, cantidad) {
    if (cantidad > 0 && cantidad != undefined) {
      producto.cantidad = cantidad;
      producto.add = true;
      this.productosAgregados.push(producto);
    }
    this.habilitarFiltro(this.productosAgregados.length);
  }
  quitarProducto(producto) {
    this.productosAgregados.filter((dato) => {
      let i = dato.nombre.indexOf(producto.nombre);
      if (i >= 0) {
        this.productosAgregados.splice(i, 1);
        producto.add = false;
        producto.cantAdd = '';
      }
    })
  }
  terminarPedido() {
    if ((this.cliente == '' || this.cliente == undefined) && (this.identificacion == '' || this.identificacion == undefined)) {
      this.agregarCliente(true);
    } else {
      this.crearPdf(this.cliente, this.identificacion, this.productosAgregados);
    }

  }

  habilitarFiltro(size) {
    if (size > 0) {
      this.vacio = false;
    } else {
      this.vacio = true;
    }
  }

  filtrar() {
    console.log('filtrar', this.filtro);
    this.initializeItems();
    if (this.filtro) {
      this.productos$ = this.productos.filter((item) => {
        return (item.add == true)
      })
    }
  }

  agregarCliente(final) {
    const alert = this.alertCtrl.create({
      title: 'PlaCMa',
      subTitle: 'Ingrese los datos del cliente para la cotización',
      inputs: [
        {
          name: 'cliente',
          placeholder: 'Cliente:',
          label: 'Cliente',
          value: this.cliente
        },
        {
          name: 'identificacion',
          label: 'Identificación',
          placeholder: 'Identificación:',
          value: this.identificacion
        },

      ],
      buttons: [
        {
          text: 'Aceptar',
          handler: data => {
            this.cliente = data.cliente;
            this.identificacion = data.identificacion;
            if (final) {
              this.crearPdf(this.cliente, this.identificacion, this.productosAgregados);
            }
          }
        },
        {
          text: 'Cancelar'
        }
      ]
    });
    alert.present();
  }



  crearPdf(cliente, identificacion, productosAgregados) {
    console.log('crear pdf', cliente, identificacion, productosAgregados);
  }
}
