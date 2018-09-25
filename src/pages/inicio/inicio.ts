import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, LoadingController } from 'ionic-angular';
import { ElementoPage } from '../elemento/elemento';
import { InventarioPage } from '../inventario/inventario';
import { FileOpener } from '@ionic-native/file-opener';

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {
tipo : string;
verInventario: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menu: MenuController,
    public platform: Platform,
    public file: File,
    public fileOpener: FileOpener,
    public loadingCtrl: LoadingController) {
    this.menu1Active();
    this.verInventario = true;
    this.tipo= this.navParams.get('tipo');
    console.log(this.tipo);
    if( this.tipo=='cliente'){
      this.verInventario = false;
    }


  }
  //esto es para desactivar los menu en la pantalla login
  menu1Active() {
    this.menu.enable(false);
  } 

  abrirElemento(){
    this.navCtrl.push(ElementoPage);
  }

  abrirInventario(){
    this.navCtrl.push(InventarioPage);
  }  


  // openFile() {
	// 	this.presentLoading();
	// 	if (this.platform.is('cordova')) {
			
	// 		this.platform.ready().then(() => {
	// 			this.pdfObjet.getBuffer((buffer) => {
	// 				var blob = new Blob([ buffer ], { type: 'application/pdf' });
	// 				this.file
	// 					.writeFile(this.file.dataDirectory, 'Bitacora.pdf', blob, { replace: true })
	// 					.then((fileEntry) => {
	// 						this.fileOpener.open(
	// 							this.file.dataDirectory + 'Bitacora.pdf',
	// 							'application/pdf'
	// 						);
	// 					});
	// 			});
	// 			return true;
	// 		});
	// 	}

	// 	this.pdfObjet.download();
	// }

	presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Por favor espere...",
      duration: 3000
    });
    loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

}
