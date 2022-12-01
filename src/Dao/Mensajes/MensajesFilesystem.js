
import { contenedorFileSystem } from "../../Contenedores/index.js";
import { config } from "../../Configuracion/index.js";


export class mensajesFilesystem extends contenedorFileSystem {
    constructor() {
        super(config.DATABASES.filesystem.MENSAJES_ARCHIVONOMBRE);
    }
}

