import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElementoPage } from './elemento';

@NgModule({
  declarations: [
    ElementoPage,
  ],
  imports: [
    IonicPageModule.forChild(ElementoPage),
  ],
})
export class ElementoPageModule {}
