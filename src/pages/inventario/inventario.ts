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

  pedido: any=[];
  producto: string;
  productos: any=[];
  fecha: any;
  hora:any;
  tiempo:string;
  idInv: string;

  
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
      
      this.productos = data;
      this.pedido=this.productos;
console.log(this.pedido);
    this.initializeItems();
    })
}

  initializeItems(){
   
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
