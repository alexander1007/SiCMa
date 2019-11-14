import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleProyectoPage } from './detalle-proyecto';

@NgModule({
  declarations: [
    DetalleProyectoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleProyectoPage),
  ],
})
export class DetalleProyectoPageModule {}
