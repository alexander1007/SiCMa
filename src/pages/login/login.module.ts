import { NgModule } from '@angular/core';
import { IonicPageModule, NavController } from 'ionic-angular';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {
  openPage(HomePage) {
    this.navCtrl.setRoot(HomePage);
  }
  constructor(public navCtrl: NavController) {
  }
}
