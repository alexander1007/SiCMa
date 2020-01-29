import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController } from 'ionic-angular';
import { PedidoPage } from '../pedido/pedido';
import { ListaInventariosService } from '../../services/inventario/inventario.service';
import * as moment from 'moment';

// pdf
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { InicioPage } from '../inicio/inicio';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@IonicPage()
@Component({
  selector: 'page-inventario',
  templateUrl: 'inventario.html',
})
export class InventarioPage {

  valorTotal: any = 0;
  pdfObjet: any;
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
    public platform: Platform,
    public file: File,
    public fileOpener: FileOpener,
    public loadingCtrl: LoadingController,
    public inventariosService: ListaInventariosService) {

    this.productosAgregados = [];
    this.fecha = moment().format('YYYY-MM-DD');
    // console.log(Number(1500).toLocaleString('en'));

    this.inventariosService.getListaInventarios().valueChanges()
      .subscribe(data => {
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
    if ((this.cliente == '' || this.cliente == undefined) || (this.identificacion == '' || this.identificacion == undefined)) {
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
          text: 'Cancelar'
        },
        {
          text: 'Aceptar',
          handler: data => {
            this.cliente = data.cliente;
            this.identificacion = data.identificacion;
            if (final) {
              if (this.cliente != '' && this.cliente != undefined && this.identificacion != '' && this.identificacion != undefined) {
                this.crearPdf(this.cliente, this.identificacion, this.productosAgregados);

              } else {
                const alert = this.alertCtrl.create({
                  title: 'PlaCMa',
                  subTitle: 'El nombre del cliente y la identificación/NIT es requerida. Ingrese un valor.',
                  buttons: ['OK']
                });
                alert.present();
                return;
              }
            }
          }
        }

      ]
    });
    alert.present();
  }



  crearPdf(cliente, identificacion, productosAgregados) {
    // preparar productos
    let info = new Array();
    let titulo = [
      { text: 'Descripción', style: 'tableHeader' },
      { text: 'Cantidad', style: 'tableHeader' },
      { text: 'Valor U.', style: 'tableHeader' },
      { text: 'Valor Total', style: 'tableHeader' }

    ];
    info.push(titulo);
    for (let i = 0; i < this.productosAgregados.length; i++) {
      this.valorTotal = this.valorTotal + (this.productosAgregados[i]['valor'] * this.productosAgregados[i]['cantidad']);
      info.push([this.productosAgregados[i]['descripcion'], this.productosAgregados[i]['cantidad'], '$ ' + Number(this.productosAgregados[i]['valor']).toLocaleString('en'),
      '$ ' + Number(this.productosAgregados[i]['valor'] * this.productosAgregados[i]['cantidad']).toLocaleString('en')]);
    }

    let footerTable = [
      { text: '', style: 'tableHeader' },
      { text: '', style: 'tableHeader' },
      { text: 'Total', style: 'total' },
      { text: '$ ' + Number(this.valorTotal).toLocaleString('en'), style: 'total' }
    ]
    info.push(footerTable);

    let pdfDefinition = {
      footer: {
        stack: [
          {
            text: 'Cotización generada por PlaCMa',
            alignment: 'center',
            bold: true
          }
        ]
      },
      content: [
        {
          text: 'Cotización\n\n',
          style: 'header',
          alignment: 'center'
        },
        {
          alignment: 'right',
          columns: [
            {
              text: ''
            },
            {
              text: 'Fecha: ' + this.fecha + '\n\n'
            }
          ]
        },
        {
          columns: [
            {
              text: 'NIT/Identificación:',
              alignment: 'left'
            },
            {
              text: 'Cliente:',
              alignment: 'right'
            }
          ], style: 'subheader',
          fontSize: 15
        },
        {
          columns: [
            {
              text: identificacion,
              alignment: 'left'
            },
            {
              text: cliente,
              alignment: 'right'
            }
          ]
        },

        {
          text: '\nProductos:\n',
          style: 'subheader'
        },
        {
          style: 'tableExample',
          table: {
            widths: [200, 50, 100, 100],
            body: info

          }
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true,
          alignment: 'justify'
        },
        total: {
          fontSize: 12,
          bold: true,
          alignment: 'justify'
        },
        tableExample: {
          margin: [5, 5],
          alignment: 'center'
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'black'
        }
      }
    };
    let nombrePdf = this.fecha + "-cotizacion-" + cliente + ".pdf";
    // cosntruccion del pdf y descarga
    this.pdfObjet = pdfMake.createPdf(pdfDefinition);
    this.openFile(nombrePdf);
  }


  openFile(nombrePdf) {
    this.presentLoading();
    console.log(this.platform.is('cordova'));

    if (this.platform.is('cordova')) {

      this.platform.ready().then(() => {
        this.pdfObjet.getBuffer((buffer) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });
          this.file.writeFile(this.file.dataDirectory, nombrePdf, blob, { replace: true })
            .then((fileEntry) => {
              this.fileOpener.open(this.file.dataDirectory + nombrePdf, 'application/pdf');
            });
        });
        return true;
      });
    } else {

      this.pdfObjet.download();
    }

  }


  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Por favor espere...",
      duration: 3000
    });
    loader.present();
  }


  irAlInicio() {
    this.navCtrl.push(InicioPage);

  }
}
