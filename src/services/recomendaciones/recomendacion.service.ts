import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
//import { Sistema } from "../../app/models/sistema";

@Injectable()
export class ListaRecomendacionesService{

constructor(private db: AngularFireDatabase) { }

getListaRecomendacionesxsistema(sistema:string){

    return this.db.list('/recomendaciones/', ref=> ref.orderByChild('sistema').equalTo(sistema));
}
}