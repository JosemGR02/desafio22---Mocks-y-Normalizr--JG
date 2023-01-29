
// NORMALIZAR
import { normalize, schema, denormalize } from 'normalizr';
import { mensajes } from '../../BaseDatos/mensajes.json';
import util from 'util';
import { obtenerMsj } from '../../Controladores/ControladorMensajes/index.js';

const jsonMensajes = obtenerMsj;

// const messages = await chat.getMessages();
// de aca entiendo que estaria hablando de un DaoMensaje y/o contenedor de mensajes y utilizando un ruta para obtener todos (mensajes) utilizando postman, tendria que hacer algo asi?

const mostrar = (objeto) => {
    console.log(util.inspect(objeto, false, 12, true));
};

const autorSchema = new schema.Entity('autor', {}, { idAttribute: 'email' });

const mensajeSchema = new schema.Entity('mensajes', {
    autor: autorSchema,
})

function normalizar(mensajes) {
    const modeloNormalizar = mensajes.map((jsonMensajes) => ({
        autor: jsonMensajes.autor,
        fecha: jsonMensajes.fecha,
        texto: jsonMensajes.texto,
        id: jsonMensajes.id,
    }));

    const normalizados = normalize(
        { id: 'mensajes', mensajes: modeloNormalizar },
        texto
    );

    return normalizados
}

const denormalizar = (objeto) => {
    return denormalize(objeto.result, texto, objeto.entities)
}


const MensajesNormalizados = normalizar(jsonMensajes);

mostrar(MensajesNormalizados);


export { MensajesNormalizados, denormalizar };

