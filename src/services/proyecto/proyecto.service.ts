import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
//import { Elemento } from "../../app/models/elemento";
// se debe instalar npm i rxjs@^6.0 rxjs-compat
@Injectable()
export class ProyectoService {
    constructor(private db: AngularFireDatabase) { }

    guardarProyecto(proyecto) {
        let key = this.db.list('/proyectos/').push(proyecto).key;
        proyecto.id = key;
        this.db.database.ref('proyectos/' + proyecto.id).set(proyecto);
    }
}