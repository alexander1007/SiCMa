import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";


@Injectable()
export class ListaRecomendacionesService {

    constructor(private db: AngularFireDatabase) { }

    getListaRecomendacionesxsistema(sistema: string) {

        return this.db.list('/recomendaciones/', ref => ref.orderByChild('sistema').equalTo(sistema));
    }
}