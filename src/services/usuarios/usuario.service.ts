import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable()
export class ListaUsuariosService {

    constructor(private db: AngularFireDatabase) { }

    getListaUsuariosxuid(uid: string) {
        console.log("pongo un mensajito");
        console.log(uid);

        return this.db.list('/usuarios/', ref => ref.orderByChild('uid').equalTo(uid));
    }
}