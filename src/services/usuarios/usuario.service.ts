import { Injectable } from "@angular/core";
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";

/**
 * Clase que contiene la lista de usuarios registrados en el sistema. 
 * @author Alexander-Sophia
 * @version 1.0
 */
@Injectable()
export class ListaUsuariosService{

constructor(private db: AngularFireDatabase) { }

//Lista de usuarios
getListaUsuariosxuid(uid: string){

    return this.db.list('/usuarios/', ref=> ref.orderByChild('uid').equalTo(uid));
}
}