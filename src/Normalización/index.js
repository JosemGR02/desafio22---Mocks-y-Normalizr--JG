


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





