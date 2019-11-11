import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../../app/models/usuario';
// import { AngularFireDatabase } from '@angular/fire/database';
//import { ElementoPage } from '../elemento/elemento';
import { InicioPage } from '../inicio/inicio';
import { ListaUsuariosService } from '../../services/usuarios/usuario.service';
import { Storage } from '@ionic/storage';
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
    //  private database: AngularFireDatabase,
    private alertCtrl: AlertController,
    public menu: MenuController,
    private storage: Storage
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
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)

        .then((success) => {
          const authObserv = this.afAuth.authState.subscribe(auth => {
            console.log(authObserv);
            this.usuarioService.getListaUsuariosxuid(auth.uid).valueChanges()
              .subscribe(data => {
                this.storage.set('idUsuario', auth.uid);
                this.usuarios = data;
                this.storage.set('emailUsuario', user.email);
                this.storage.set('login', true);
                this.tipo = this.usuarios[0].tipo;
                this.navCtrl.setRoot(InicioPage, { tipo: this.tipo });

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