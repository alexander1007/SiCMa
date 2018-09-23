import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SistemasPage } from './sistemas';

@NgModule({
  declarations: [
    SistemasPage,
  ],
  imports: [
    IonicPageModule.forChild(SistemasPage),
  ],
})
export class SistemasPageModule {}
