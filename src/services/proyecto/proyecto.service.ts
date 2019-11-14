import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Storage } from '@ionic/storage';
//import { Elemento } from "../../app/models/elemento";
// se debe instalar npm i rxjs@^6.0 rxjs-compat
@Injectable()
export class ProyectoService {

    constructor(private db: AngularFireDatabase, private storage: Storage) { }

    guardarProyecto(proyecto) {
        let key = this.db.list('/proyectos/').push(proyecto).key;
        proyecto.id = key;
        this.storage.set('idProyecto', proyecto.id);
        this.db.database.ref('proyectos/' + proyecto.id).set(proyecto);
    }

    guardarProyectoDetalle(detalleProyecto) {
        let key = this.db.list('/detalleProyectos/').push(detalleProyecto).key;
        detalleProyecto.id = key;
        this.db.database.ref('detalleProyectos/' + detalleProyecto.id).set(detalleProyecto);
        return key;
    }
    guardarResultadoProyecto(materiales) {
        let key = this.db.list('/resultadoProyectos/').push(materiales).key;
        materiales.id = key;
        this.db.database.ref('resultadoProyectos/' + materiales.id).set(materiales);
    }

    actualizarValorDetalle(detalleProducto) {
        this.db.database.ref('detalleProyectos/' + detalleProducto.id).set(detalleProducto);

    }

    listarProyectosUsuario(usuario) {
        return this.db.list('/proyectos/', ref => ref.orderByChild('usuarioId').equalTo(usuario));

    }
}