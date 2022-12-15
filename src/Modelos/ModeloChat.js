
import { Schema } from "mongoose";

const ColeccionChat = "chats";

const EsquemaChat = new Schema(
    {
        publicaciones: {
            id: { type: String, required: true, max: 10 },
            timestamp: { type: String, required: true, max: 100 },
            mensajes: [],
        }
    }
);

EsquemaChat.set("toJSON", {
    transform: (_, respuesta) => {
        respuesta.id = respuesta._id;
        delete respuesta.__v;
        delete respuesta._id;
        return respuesta;
    },
});

export const modeloChat = { EsquemaChat, ColeccionChat };



// NUEVOS MENSAJES

// {
//     autor: {
//         id: "email@445";
//         nombre: "pepito";
//         apellido: "martinez";
//         edad: 34,
//         alias: "el Pepo";
//         avatar: "url"
//     },
//     texto: 'mensaje del usuario'
// }

// "publicaciones": {id: '4444', mensajes: []}

