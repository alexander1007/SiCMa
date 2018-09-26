import { Injectable } from "@angular/core";
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";

/**
 * Clase que contiene las medidas y materiales por sistema 
 * @author Alexander - Sophia
 * @version 1.0
 */
@Injectable()
export class ListaMedidasService {
    
    private listaMedidas = this.db.list("medidas");
   
    
    constructor(private db: AngularFireDatabase) { }
  //todas las medidas
    getListaMedidas() {
        return this.listaMedidas;
    }

    //medida por elemento
    getListaMedidasByelemento(elemento:string) {
        return this.db.list('/medidas/', ref=> ref.orderByChild('elemento').equalTo(elemento));
    }

    getListaMaterialesbySistema(sistema:string){
        return this.db.list('/materiales/', ref=> ref.orderByChild('sistema').equalTo(sistema));
    }

}