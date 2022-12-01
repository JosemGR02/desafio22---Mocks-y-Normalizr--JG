
import { contenedorFirebase } from "../../Contenedores/index.js";
import { config } from "../../Configuracion/index.js";


export class productosFirebase extends contenedorFirebase {
    constructor() {
        super(config.DATABASES.firebase);
    }
}