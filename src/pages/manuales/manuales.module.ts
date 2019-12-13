import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManualesPage } from './manuales';

@NgModule({
  declarations: [
    ManualesPage,
  ],
  imports: [
    IonicPageModule.forChild(ManualesPage),
  ],
})
export class ManualesPageModule {}
