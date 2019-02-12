import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";


/**
 * class that contains the descriptions and recommendations of the systems
 * @author Alexander Satizabal
 * @version 1.0
 */
@Injectable()
export class ListaRecomendacionesService {

    constructor(private db: AngularFireDatabase) { }

//Lista de recomendaciones 
getListaRecomendacionesxsistema(sistema:string){
    return this.db.list('/recomendaciones/', ref=> ref.orderByChild('sistema').equalTo(sistema));
}
}