import { Injectable } from "@angular/core";
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs-compat';
import { Elemento } from "../../app/models/elemento";
// se debe instalar npm i rxjs@^6.0 rxjs-compat
@Injectable()
export class ListaElementosService {
    private listaElementos = this.db.list<Elemento>("elementos");
    
    constructor(private db: AngularFireDatabase) { }
  //todos los elementos
    getListaElementos() {
        return this.listaElementos;
    }

    //elemento por llave
    getListaElementosByKey(key:string) {
        return this.db.list('/elementos/', ref=> ref.orderByChild('key').equalTo(key));
    }

}
