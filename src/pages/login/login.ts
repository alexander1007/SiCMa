import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../../app/models/usuario';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { ElementoPage } from '../elemento/elemento';
import { InicioPage } from '../inicio/inicio';
import { ListaUsuariosService } from '../../services/usuarios/usuario.service';
//import { User } from 'firebase';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  user = {} as Usuario;
  usuarios: any = [];
  tipo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public usuarioService: ListaUsuariosService,
    private afAuth: AngularFireAuth,
    private database: AngularFireDatabase,
    private alertCtrl: AlertController,
    public menu: MenuController
  ) {
    this.menu1Active();

  }

  //esto es para desactivar los menu en la pantalla login
  menu1Active() {
    this.menu.enable(false);
  }

  // autenticar
  ingresar(user: Usuario) {
    console.log(user);

    if (user.email != null && user.password != null) {
      console.log("chere");
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)

        .then((success) => {
          console.log("cualquier cosa aqui voy");
          const authObserv = this.afAuth.authState.subscribe(auth => {
            console.log(auth);
            this.usuarioService.getListaUsuariosxuid(auth.uid).valueChanges()
              .subscribe(data => {
                console.log("le doy aqui a ver");
                console.log(data);
                this.usuarios = data;

                this.tipo = this.usuarios[0].tipo;
                this.navCtrl.setRoot(InicioPage, { tipo: this.tipo });
                console.log(this.tipo);
              })



          }) // autenticar
        }).catch((err) => {
          let alert = this.alertCtrl.create({
            title: 'Autenticación Incorrecta',
            subTitle: "Verifica tú Correo y Contraseña",
            buttons: ['Aceptar']
          });
          alert.present();
        })
      //pendiiente limpiar pagina de login al ir atras
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Autenticación Incorrecta',
        subTitle: "Faltan datos",
        buttons: ['Aceptar']
      });
      alert.present();
    }

  }


  ionViewDidLoad() {
    this.user.email = "alex@s.com";
    this.user.password = "123456";
  }
}