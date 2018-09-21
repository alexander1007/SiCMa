import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { AngularFireAuth } from '@angular/fire/auth';


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
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afAuth: AngularFireAuth
  ) {
  }

 async ingresar(user: Usuario){
  this.navCtrl.setRoot('ElementoPage');
        try{
        const result =  this.afAuth.auth.signInWithEmailAndPassword(user.correo, user.contrasena);
        console.log(result);
          
      }
      catch(e){
        console.error(e);
      }
}


}