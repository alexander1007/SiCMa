import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Sistema } from "../../app/models/sistema";

/**
 * class that contains the list of systems
 * @author Alexander-Sophia
 * @version 1.0
 */
@Injectable()
export class ListaSistemasService {
    private listaSistemas = this.db.list<Sistema>("sistemas");

    constructor(private db: AngularFireDatabase) { }

    getListaSistemaxElemento(elemento: string) {
        console.log(this.listaSistemas);
        return this.db.list('/sistemas/', ref => ref.orderByChild('elemento').equalTo(elemento));
    }
}
