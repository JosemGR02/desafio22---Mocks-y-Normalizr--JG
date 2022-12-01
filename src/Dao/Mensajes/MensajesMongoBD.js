
import { contenedorMongoBD } from "../../Contenedores/index.js";
import { modeloCarrito } from "../../Modelos/index.js";


export class mensajesMongoBD extends contenedorMongoBD {
    constructor() {
        super({
            nombre: modeloCarrito.CartCollection,
            schema: modeloCarrito.CartSchema,
        });
    }

    async obtenerXid(id) {
        const respuesta = await this.model.findById(id).populate("productos");

        return respuesta;
    }
}

