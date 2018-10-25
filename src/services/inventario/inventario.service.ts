import { Injectable } from "@angular/core";
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import { Sistema } from "../../app/models/sistema";

@Injectable()
export class ListaInventariosService{

constructor(private db: AngularFireDatabase) { }

getListaInventarios(fecha:any, idInv:string ){

    console.log(fecha);
    console.log(idInv);

    return this.db.list('/inventarios/inventario'+fecha+idInv);
}
}