import { Injectable } from "@angular/core";
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";

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

}