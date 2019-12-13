import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class ManualService {

    private listaMedidas = this.db.list("medidas");


    constructor(private db: AngularFireDatabase) { }


    getListaManuales() {
        return this.db.list('/manuales/');
    }

}