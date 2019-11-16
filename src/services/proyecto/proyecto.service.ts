import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Storage } from '@ionic/storage';
import { Subscription, Observable } from "rxjs";
//import { Elemento } from "../../app/models/elemento";
// se debe instalar npm i rxjs@^6.0 rxjs-compat
export interface res {
    id: string

}
@Injectable()
export class ProyectoService {


    materialesResult: {}[];
    detalleProyecto: {}[];
    materiales: Subscription;
    detalle: Subscription;
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
    guardarResultadoProyecto(materiales, detalleId) {
        let key = this.db.list('/resultadoProyectos/').push(materiales).key;
        materiales.id = key;
        materiales.idDetalle = detalleId;
        this.db.database.ref('resultadoProyectos/' + materiales.id).set(materiales);
        return key;
    }

    actualizarValorDetalle(detalleProducto) {
        console.log('detalkle0', detalleProducto);
        this.db.database.ref('detalleProyectos/' + detalleProducto.id).set(detalleProducto);

    }

    listarProyectosUsuario(usuario) {
        return this.db.list('/proyectos/', ref => ref.orderByChild('usuarioId').equalTo(usuario));
    }

    listarDetalleProyecto(proyecto) {
        return this.db.list('/detalleProyectos/', ref => ref.orderByChild('idProyecto').equalTo(proyecto));



    }
    listarMaterialesProyecto(id) {
        console.log('materiales ', id);
        return this.db.list('/resultadoProyectos/', ref => ref.orderByChild('idDetalle').equalTo(id));
    }

    editarProyecto(proyecto, id) {
        this.db.database.ref('proyectos/' + id).set(proyecto);

    }
    eliminarResultado(id) {
        this.db.database.ref('resultadoProyectos/' + id).remove();
    }
    eliminarDetalle(id) {
        this.db.database.ref('detalleProyectos/' + id).remove();
    }
    eliminarProyuecto(id) {
        this.db.database.ref('proyectos/' + id).remove();
    }


}