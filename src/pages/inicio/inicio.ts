import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, LoadingController, AlertController } from 'ionic-angular';
import { ElementoPage } from '../elemento/elemento';
import { InventarioPage } from '../inventario/inventario';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';

import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { FileTransfer } from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ProyectoPage } from '../proyecto/proyecto';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';





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
  tipo: string;
  verInventario: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menu: MenuController,
    public platform: Platform,
    public file: File,
    public fileOpener: FileOpener,
    public fileChooser: FileChooser,
    public filePath: FilePath,
    private document: DocumentViewer,
    public loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    private iab: InAppBrowser,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.menu1Active();
    this.verInventario = true;
    this.tipo = this.navParams.get('tipo');
    console.log(this.tipo);
    if (this.tipo == 'cliente') {
      this.verInventario = false;
    }


  }
  //esto es para desactivar los menu en la pantalla login
  menu1Active() {
    this.menu.enable(false);
  }

  abrirElemento() {
    this.navCtrl.push(ProyectoPage);
  }

  abrirInventario() {
    this.navCtrl.push(InventarioPage);
  } options


  openFile() {
    this.presentLoading();
    let url = encodeURIComponent('https://firebasestorage.googleapis.com/v0/b/sicma-54be2.appspot.com/o/file%2Fportafolio.pdf?alt=media&token=1ce095b8-0f0b-435a-a2bf-6220902ff540');
    this.iab.create('https://docs.google.com/viewer?url=' + url);


  }

  downloadAndOpenPdf() {
    this.presentLoading();

    let path = null;

    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.platform.is('android')) {
      path = this.file.dataDirectory;
    }

    const transfer = this.transfer.create();
    transfer.download('https://devdactic.com/html/5-simple-hacks-LBT.pdf', path + 'myfile.pdf').then(entry => {
      let url = entry.toURL();
      this.document.viewDocument(url, 'application/pdf', {});
    });
  }

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

  salir() {
    this.storage.clear();
    this.navCtrl.setRoot(LoginPage);
  }

  confirmarSalir() {
    const alert = this.alertCtrl.create({
      title: 'PlaCMa',
      subTitle: '¿Está seguro que desea salir de la aplicación?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.salir();
          }
        },
        {
          text: 'No'
        }
      ]
    });
    alert.present();
  }

}
