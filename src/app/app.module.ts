import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import {AngularFireModule} from 'angularfire2';
import { LoginPage } from '../pages/login/login';


// zona de coneccion con firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HomePageModule } from '../pages/home/home.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ElementoPageModule } from '../pages/elemento/elemento.module';
import { ListaElementosService } from '../services/elementos/elemento.service';
export const firebaseConfig = {

  apiKey: "AIzaSyBztP9PGq1yKQVEq0l1sZsG7U8uQ58X_44",
  authDomain: "sicma-54be2.firebaseapp.com",
  databaseURL: "https://sicma-54be2.firebaseio.com",
  projectId: "sicma-54be2",
  storageBucket: "sicma-54be2.appspot.com",
  messagingSenderId: "985040714090"
};
import { AngularFireStorageModule } from 'angularfire2/storage';
import { IonicStorageModule } from '@ionic/storage';
import { SistemasPage } from '../pages/sistemas/sistemas';
import { SistemasPageModule } from '../pages/sistemas/sistemas.module';
import { ListaSistemasService } from '../services/sistemas/sistema.service';

 
@NgModule({
  declarations: [
    MyApp,
   
  ],
  imports: [
    
    SistemasPageModule,
    BrowserModule,
    HomePageModule,
    LoginPageModule,
    ElementoPageModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
 

  ],
  providers: [
    ListaSistemasService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ListaElementosService
  ]
})
export class AppModule {}
