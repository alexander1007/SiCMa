import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoPage } from '../pedido/pedido';

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

  pedido: { id: number; nombre: string; peso: string; precio: string; stock: string; }[];
  producto: string;

  productos: Array<{id:number, nombre: String, peso: String, precio: String, stock: String}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.initializeItems();
  }

  initializeItems(){
    this.productos=[
      {id:1, nombre:'LIBRAS PUNTILLA 2"CC',peso:'12', precio:'1233', stock:'10'},
      {id:2, nombre:'CODO 4 X 90 CXC SANIT.',peso:'12', precio:'1233', stock:'10'},
      {id:3, nombre:'CARRETA 2000 SUPER ANTIPINCHASOS PES.',peso:'12', precio:'1233', stock:'10'},
      {id:4, nombre:'PALAS GARLANCHAS 6056-2',peso:'12', precio:'1233', stock:'10'},
      {id:5, nombre:'PEGACOR INTERIOR GRIS X 30 KG',peso:'12', precio:'1233', stock:'10'},
      {id:5, nombre:'PERFIL ENTREPISO C.16 X 6 mt',peso:'12', precio:'1233', stock:'10'},
      {id:6, nombre:'PLASTOCRETE DM x 4.5 KG',peso:'12', precio:'1233', stock:'10'},
      {id:7, nombre:'VARILLA A.R 1/2"',peso:'12', precio:'1233', stock:'10'},
      {id:8, nombre:'VINILTEX BLANCO x GL',peso:'12', precio:'1233', stock:'10'},
      {id:9, nombre:'TEJA FIBROCEMENTO 5C #10',peso:'12', precio:'1233', stock:'10'},
      {id:10, nombre:'SOLD WA ACP 611 1/8',peso:'12', precio:'1233', stock:'10'}
    ];

    this.pedido=[
      {id:2, nombre:'CODO 4 X 90 CXC SANIT.',peso:'12', precio:'1233', stock:'10'},
      {id:3, nombre:'CARRETA 2000 SUPER ANTIPINCHASOS PES.',peso:'12', precio:'1233', stock:'10'},
      {id:5, nombre:'PERFIL ENTREPISO C.16 X 6 mt',peso:'12', precio:'1233', stock:'10'},
      {id:7, nombre:'VARILLA A.R 1/2"',peso:'12', precio:'1233', stock:'10'},
      {id:9, nombre:'TEJA FIBROCEMENTO 5C #10',peso:'12', precio:'1233', stock:'10'},
    ]

  }

  
  getItems(ev) {
    
    this.initializeItems();

    var val = ev.target.value;

    if (val && val.trim() != '') {
      this.productos = this.productos.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

 
  abrirPedido(producto){
    this.navCtrl.push(PedidoPage, {producto: producto});
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventarioPage');
  }

  addNote(producto){

  }

}
