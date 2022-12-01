

import { contenedorMongoBD } from "../../Contenedores/index.js";
import { modeloProducto } from "../../Modelos/index.js";


export class productosMongoBD extends contenedorMongoBD {
    constructor() {
        super({
            name: modeloProducto.ProductsCollection,
            schema: modeloProducto.ProductSchema,
        });
    }
}

