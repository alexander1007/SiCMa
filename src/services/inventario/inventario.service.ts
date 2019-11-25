import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
//import { Sistema } from "../../app/models/sistema";

@Injectable()
export class ListaInventariosService {

    constructor(private db: AngularFireDatabase) { }

    getListaInventarios() {
        return this.db.list('/materiales/', ref => ref.orderByChild('cotizacion').equalTo('si'));
    }
}