


import { normalize, schema } from 'normalizr';
import { datosOrigen } from '../DatosOrigen.json';
import util from 'util';


// CAMBIAR ID NORMALIZR
// const autorSchema = new schema.Entity('autor', {...}, { idAttribute: 'email' });
const autorSchema = new schema.Entity('autor', {}, { idAttribute: 'email' });

const mensajeSchema = new schema.Entity('mensajes', {
    autor: autorSchema,
})

const publicaciones = new schema.Entity('publicaciones', {
    mensajes: [mensajeSchema]
})

const mostrar = (objeto) => {
    console.log(util.inspect(objeto, false, 12, true));
};


const datosNormalizados = normalize(datosOrigen, publicaciones)
console.log('------------------ Datos -- Normalizados ------------------');
mostrar(datosNormalizados);


const elementoNormal = parseInt(JSON.stringify(datosNormalizados).length)
console.log(elementoNormal)

console.log(JSON.stringify(datosOrigen).length);
console.log(JSON.stringify(datosNormalizados).length);


export { datosNormalizados };





// import { normalize, schema, denormalize } from 'normalizr';

// const autorSchema = new schema.Entity('autor');
// const textoSchema = new schema.Entity('autor', {
//     autor: autor
// });

// function normalizar(mensajes) {
//     const normalizar = mensajes.map((msj) => ({
//         autor: msj.autor,
//         fecha: msj.fecha,
//         autor: msj.texto,
//         id: msj.id,
//     }));

//     const normalizados = normalize(
//         { id: 'mensajes', mensajes: normalizar },
//         texto
//     );

//     return normalizados
// }

// const denormalizar = (obj) => {
//     return denormalize(obj.result, texto, obj.entities)
// }

// export { normalizar, denormalizar };