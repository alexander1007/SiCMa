import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElementoPage } from './elemento';

/**
 * Modulo que representa a un elemento de la pagina, este se encarga de conectar la vista con el modelo. 
 * @author Alexander
 * @version 1.0
 */
@NgModule({
  declarations: [
    ElementoPage,
  ],
  imports: [
    IonicPageModule.forChild(ElementoPage),
  ],
})
export class ElementoPageModule {}
