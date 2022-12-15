const { normalize, schema, denormalize } = require('normalizr');
const mensajesJson = require("./db/messages.json")


const author = new schema.Entity('author');
const text = new schema.Entity('text', {
    author: author
});

function normalizar(mensajes) {
    const normalizar = mensajes.map((message) => ({
        author: message.author,
        date: message.date,
        text: message.text,
        id: message.id,
    }));

    const normalizados = normalize(
        { id: 'mensajes', messages: normalizar },
        text
    );

    return normalizados
}

const denormalizar = (obj) => {
    return denormalize(obj.result, text, obj.entities)
}

normalizar(mensajesJson)

module.exports = { normalizar, denormalizar }