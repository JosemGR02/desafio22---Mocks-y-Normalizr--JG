
import { config } from "../Configuracion/index.js";
import { servicioMongoDB, conectar } from "../Servicios/index.js";
import { mensajesMongoBD, mensajesFilesystem, mensajesFirebase, mensajesMemoria } from "./Mensajes/index.js";
import { productosMongoBD, productosFileSystem, productosFirebase, productosMemoria } from "./Productos/index.js";


const obtenerDaoSeleccionados = () => {
  switch (config.SERVER.SELECCION_BASEdDATOS) {
    case "mongo": {
      servicioMongoDB.init();
      return {
        DaoProducto: new productosMongoBD(),
        DaoMensaje: new mensajesMongoBD(),
      };
    }
    case "filesystem": {
      return {
        DaoProducto: new productosFileSystem(),
        DaoMensaje: new mensajesFilesystem(),
      };
    }
    case "memory": {
      return {
        DaoProducto: new productosMemoria(),
        DaoMensaje: new mensajesMemoria(),
      };
    }
    case "firebase": {
      conectar()
      return {
        DaoProducto: new productosFirebase(),
        DaoMensaje: new mensajesFirebase(),
      };
    }
  }
};

const { DaoProducto, DaoMensaje } = obtenerDaoSeleccionados();

export { DaoProducto, DaoMensaje };



