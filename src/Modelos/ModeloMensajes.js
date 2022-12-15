
import { Schema } from "mongoose";

const ColeccionMensajes = "mensajes";

const EsquemaMensajes = new Schema(
    {
        autor: {
            id: { type: String, required: true, max: 10 },
            nombre: { type: String, required: true, max: 40 },
            apellido: { type: String, required: true, max: 40 },
            edad: { type: Number, required: true, max: 3 },
            alias: { type: String, required: true, max: 30 },
            avatar: { type: String, required: true, max: 150 }
        },
        texto: [{ type: Schema.Types.ObjectId, ref: 'mensajes' }]
    }
);

EsquemaMensajes.set("toJSON", {
    transform: (_, respuesta) => {
        respuesta.id = respuesta._id;
        delete respuesta.__v;
        delete respuesta._id;
        return respuesta;
    },
});


export const modeloMensajes = { EsquemaMensajes, ColeccionMensajes };

