

import { contenedorFileSystem } from "../../Contenedores/index.js";
import { config } from "../../Configuracion/index.js";


export class productosFileSystem extends contenedorFileSystem {
    constructor() {
        super(config.DATABASES.filesystem.PRODUCTOS_ARCHIVONOMBRE);
    }
}