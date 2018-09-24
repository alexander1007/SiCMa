import { Injectable } from "@angular/core";
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";

@Injectable()
export class ListaMedidasService {
    
    private listaMedidas = this.db.list("medidas");
   // list<Elemento>("elementos");
    
    constructor(private db: AngularFireDatabase) { }
  //todos los elementos
    getListaMedidas() {
        return this.listaMedidas;
    }

    //elemento por llave
    getListaMedidasByKey(key:string) {
        return this.db.list('/medidas/', ref=> ref.orderByChild('key').equalTo(key));
    }

}