import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { ManualService } from '../../services/manual/manual.service';
import firebase from 'firebase';
import { File } from '@ionic-native/file';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FileOpener } from '@ionic-native/file-opener';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer } from '@ionic-native/file-transfer';
import { InicioPage } from '../inicio/inicio';
/**
 * Generated class for the ManualesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manuales',
  templateUrl: 'manuales.html',
})
export class ManualesPage {

  files: any;
  urlFiles: any[];
  manuales: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public manualService: ManualService,
    public loadingCtrl: LoadingController, private iab: InAppBrowser, public platform: Platform,
    public file: File,
    public fileOpener: FileOpener,
    public fileChooser: FileChooser,
    public filePath: FilePath,
    private document: DocumentViewer,
    private transfer: FileTransfer

  ) {
    this.files = [];
  }

  ionViewDidLoad() {
    this.consultarManuales();
  }

  consultarManuales() {
    this.manualService.getListaManuales().valueChanges()
      .subscribe(data => {
        this.manuales = data;
        this.manuales.sort(function (a, b) {
          return a.nombre.localeCompare(b.nombre);
        });
        // url de los materiales
        this.urlFiles = Array(this.manuales.length);
        for (var index = 0; index < this.manuales.length; index++) {
          this.files[index] = `file/` + this.manuales[index].documento;
          this.generarFiles(index);
        }
      });
  }

  generarFiles(index) {

    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(this.files[index]);
    imageRef.getDownloadURL().then(url => {

      this.urlFiles[index] = url;
      this.manuales[index].file = url;
    })
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Por favor espere...",
      duration: 1000
    });
    loader.present();
  }

  abrirPDF(url) {
    this.presentLoading();
    let ruta = encodeURIComponent(url);
    this.iab.create('https://docs.google.com/viewer?url=' + ruta);

  }

  irAlInicio() {
    this.navCtrl.push(InicioPage);

  }

}
