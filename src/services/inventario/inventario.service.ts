import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class ListaInventariosService {

    constructor(private db: AngularFireDatabase) { }

    getListaInventarios(fecha: any, idInv: string) {

        console.log(fecha);
        console.log(idInv);

        return this.db.list('/inventarios/inventario' + fecha + idInv);
    }
}