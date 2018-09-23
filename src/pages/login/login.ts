import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../../app/models/usuario';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { ElementoPage } from '../elemento/elemento';
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
  user= { } as Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afAuth: AngularFireAuth,
    private database: AngularFireDatabase,
    private alertCtrl: AlertController
  ) {
  }

// autenticar
ingresar(user: Usuario) 
{
console.log(user);

  if(user.email!=null && user.password!=null){
    this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password ) 
    
 .then((success)=>{

   const authObserv= this.afAuth.authState.subscribe(auth => {
   
      this.navCtrl.setRoot(ElementoPage); 
  }) // autenticar
}).catch((err)=>{
  let alert = this.alertCtrl.create({
    title: 'Autenticación Incorrecta',
    subTitle: "Verifica tú Correo y Contraseña",
    buttons: ['Aceptar']
  });
  alert.present();
}) 
//pendiiente limpiar pagina de login al ir atras
}
else{
  let alert = this.alertCtrl.create({
    title: 'Autenticación Incorrecta',
    subTitle: "Faltan datos",
    buttons: ['Aceptar']
  });
  alert.present();
}

 }


}