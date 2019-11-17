import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProyectoPage } from './proyecto';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    ProyectoPage,
  ],
  imports: [
    IonicPageModule.forChild(ProyectoPage),
    IonicImageViewerModule
  ],
})
export class ProyectoPageModule { }
