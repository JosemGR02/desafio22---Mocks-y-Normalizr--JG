
import { contenedorFirebase } from "../../Contenedores/index.js";
import { config } from "../../Configuracion/index.js";


export class mensajesFirebase extends contenedorFirebase {
    constructor() {
        super(config.DATABASES.firebase);
    }
}

