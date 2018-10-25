import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  producto: string;
  inventarios: any=[];
  fecha: any;
  hora:any;
  tiempo:string;
  idInv: string;

  productos: Array<{id:number, nombre: String}>;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public inventariosService: ListaInventariosService, ) {

      this.fecha= moment().format('YYYYMMDD');
      this.hora=moment().format('LT');
      this.tiempo= this.hora.substr(-2);

      if(this.tiempo=='PM'){

        this.idInv='tarde';
      }
      else{
        this.idInv='mañana';
      }

      console.log(this.fecha);
      console.log(this.hora);
      console.log(this.tiempo);
      console.log(this.idInv);

    this.inventariosService.getListaInventarios(this.fecha, this.idInv).valueChanges()
    .subscribe(data =>{
      
      this.inventarios = data;
      console.log(this.inventarios);

    this.initializeItems();
    })
}

  initializeItems(){
    this.productos=[
      {id:1, nombre:'LIBRAS PUNTILLA 2"CC'},
      {id:2, nombre:'CODO 4 X 90 CXC SANIT.'},
      {id:3, nombre:'CARRETA 2000 SUPER ANTIPINCHASOS PES.'},
      {id:4, nombre:'PALAS GARLANCHAS 6056-2'},
      {id:5, nombre:'PEGACOR INTERIOR GRIS X 30 KG'},
      {id:5, nombre:'PERFIL ENTREPISO C.16 X 6 mt'},
      {id:6, nombre:'PLASTOCRETE DM x 4.5 KG'},
      {id:7, nombre:'VARILLA A.R 1/2"'},
      {id:8, nombre:'VINILTEX BLANCO x GL'},
      {id:9, nombre:'TEJA FIBROCEMENTO 5C #10'},
      {id:10, nombre:'SOLD WA ACP 611 1/8'}
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

}
