
import { conectar } from "./conexion.js";
import { contenedorFirebase } from "../../Contenedores/index.js";


conectar().then(baseDatos => {
    const collections = baseDatos.collection('mensajes')

    contenedorFirebase.findAll(collections).then(datos => {
        console.log(datos)

        return contenedorFirebase.update(collections, 'tdgsf2dhsjuq1j2rx', { nombre: "pepito" })
    }).then(() =>
        contenedorFirebase.findAll(collections)
    )
        .then(datos => console.log(datos))
})
