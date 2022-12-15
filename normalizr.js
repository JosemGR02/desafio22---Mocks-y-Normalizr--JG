
// NORMALIZAR

import { normalize, schema, denormalize } from 'normalizr';
import { datosOrigen } from '../DatosOrigen.json';
import util from 'util';


const autorSchema = new schema.Entity('autor', {}, { idAttribute: 'email' });

const mensajeSchema = new schema.Entity('mensajes', {
    autor: autorSchema,
})

const mostrar = (objeto) => {
    console.log(util.inspect(objeto, false, 12, true));
};

const datosNormalizados = normalize(datosOrigen)
console.log('------------------ Datos -- Normalizados ------------------');
mostrar(datosNormalizados);

console.log(JSON.stringify(datosOrigen).length);
console.log(JSON.stringify(datosNormalizados).length);


export { datosNormalizados };


/*------------------------------------------------------------------------------------------------------------------*/
// DENORMALIZAR

import { denormalize } from 'normalizr';
import { datosNormalizados } from '../../../src/Normalización/index.js';


const datosDesnormalizados = denormalize(datosNormalizados.result, articulos, datosNormalizados.entities)
console.log('------------------ Datos -- Denormalizados ------------------');
console.log(datosDesnormalizados);

const elementoNormal = parseInt(JSON.stringify(datosNormalizados).length)
const elementOriginal = parseInt(JSON.stringify(datosDesnormalizados).length)

console.log(JSON.stringify(datosOrigen).length);
console.log(JSON.stringify(datosNormalizados).length);
console.log(JSON.stringify(datosDesnormalizados).length);


function obtenerPorcentaje(primerElemento, segundoElemento) {
    const porcentaje = ((primerElemento / segundoElemento * 100) - 100).toFixed(2)
    console.log(`El porcentaje de compresion fue del ${porcentaje}%`);
}

const comprensionTotal = obtenerPorcentaje(elementoNormal, elementOriginal);


export { datosDesnormalizados, comprensionTotal };



/*------------------------------------------------------------------------------------------------------------------*/



// const { normalize, schema, denormalize } = require('normalizr');

// const author = new schema.Entity('author');
// const text = new schema.Entity('text', {
//     author: author
// });

// function normalizar(mensajes) {
//     const normalizar = mensajes.map((message) => ({
//         author: message.author,
//         date: message.date,
//         text: message.text,
//         id: message.id,
//     }));

//     const normalizados = normalize(
//         { id: 'mensajes', messages: normalizar },
//         text
//     );

//     return normalizados
// }

// const denormalizar = (obj) => {
//     return denormalize(obj.result, text, obj.entities)
// }

// module.exports = { normalizar, denormalizar }




// const { normalizar, denormalizar } = require(‘./utils/normalizar’);

// const messages = await chat.getMessages();

// const normalizedMessages = normalizar(messages);

// console.log(normalizedMessages);

// const denormalizedMessages = denormalizar(normalizedMessages);

// console.log(denormalizedMessages)











