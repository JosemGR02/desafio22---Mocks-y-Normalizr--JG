
import { normalizr } from 'normalizr';
import { util } from 'util';

const normalizar = normalizr.normalize;
const desnormalizar = normalizr.denormalize;

// Data
const empresa = {
    id: '1000',
    nombre: 'Coderhouse',
    gerente: {
        id: '2',
        nombre: 'Pedro',
        apellido: 'Mei',
        DNI: '20442639',
        direccion: 'CABA 457',
        telefono: '1567811544',
    },
    encargado: {
        id: '3',
        nombre: 'Pablo',
        apellido: 'Blanco',
        DNI: '20442640',
        direccion: 'CABA 458',
        telefono: '1567811545',
    },
    empleados: [
        {
            id: '1',
            nombre: 'Nicole',
            apellido: 'Gonzalez',
            DNI: '20442638',
            direccion: 'CABA 456',
            telefono: '1567811543',
        }
    ],
};

const gerenteSchema = new normalizr.schema.Entity('gerente');
const encargadoSchema = new normalizr.schema.Entity('encargado');
const empleadosSchema = new normalizr.schema.Entity('empleados', {
    gerente: gerenteSchema,
    encargado: encargadoSchema
});

const empresaSchema = new normalizr.schema.Entity('empresa', [{
    empleados: [empleadosSchema]
}]);
// obj - json
// schema



const data_normalizada = normalizar(empresa, empresaSchema);
// console.log('Data normalizada', JSON.stringify(data_normalizada));


// ○ El primer parámetro es el objeto a inspeccionar.
// ○ El segundo parámetro muestra todas las propiedades ocultas y no ocultas.
// ○ El tercer parámetro indica hasta qué profundidad es analizado el objeto.
// ○ El cuarto parámetro colorea la salida.
console.log('Data normalizada', data_normalizada)
console.log('Length data normalizada', JSON.stringify(data_normalizada).length);
console.log('-----------------')

const data_denormalizada = desnormalizar(data_normalizada.result, empresaSchema, data_normalizada.entities);
console.log('Data desnormalizada', util.inspect(data_denormalizada, false, 12, true))
console.log('Length data desnormalizada', JSON.stringify(data_denormalizada).length);


// Normalizar JSON
// Normalizar la estructura del objeto en formato JSON empresa.json
// (disponible en la carpeta de la clase) que describe el organigrama de una empresa. El gerente y el encargado figuran en el array de empleados de la empresa.
// Imprimir por consola el objeto normalizado y la longitud del objeto original y del normalizado. Comparar los resultados.
// Nota: En adelante, utilizar la siguiente función 'print' para imprimir el contenido de un objeto:






//------------------------------------------------------------------------------------------------------------------//







// import {normalizr} from 'normalizr;
// const normalizar = normalizr.normalize;
// const desnormalizar = normalizr.denormalize;
// import { util } from 'util';
// import {holding} from '../holding.json';
// const usersSchema = new normalizr.schema.Entity('users');

// const empresaSchema = new normalizr.schema.Entity('empresa', {
//     gerente: usersSchema,
//     encargado: usersSchema,
//     empleados: [usersSchema]

// });
// const holdingSchema = new normalizr.schema.Entity('holding', {
//     empresas: [empresaSchema]
// });

// const data_normalizada = normalizar(holding, holdingSchema);
// const utils = (objeto) => {
//     console.log(util.inspect(objeto, false, 12, true));
// }
// utils(data_normalizada);
// console.log('Antes: ', JSON.stringify(holding).length);
// console.log('Después: ', JSON.stringify(data_normalizada).length);




// // Normalización y desnormalización con redundancia
// // Dado el objeto en formato JSON holding.json (disponible en la carpeta de la clase) que representa la información correspondiente a un grupo de empresas:
// // Definir el esquema de normalización.
// // Obtener el objeto normalizado e imprimirlo por consola.
// // Desnormalizar el objeto obtenido en el punto anterior.
// // Imprimir la longitud del objeto original, del normalizado y del desnormalizado
// // Imprimir el porcentaje de compresión del proceso de normalización.
// // Comparar y analizar los resultados.






//------------------------------------------------------------------------------------------------------------------//




// // redundancia son
// // empresa
// // empresados
// // personas
// const normalizr = require("normalizr");
// const normalizar = normalizr.normalize;
// const desnormalizar = normalizr.denormalize;
// const holding = require("../holding.json");
// const util = require("util");
// const mostrar = (objeto) => {
//     console.log(util.inspect(objeto, false, 12, true));
// };
// const getLength = (obj) => JSON.stringify(obj).length;
// const empleado = new normalizr.schema.Entity("empleado");
// const empresa = new normalizr.schema.Entity("empresa", {
//     empleados: [empleado],
//     gerente: empleado,
//     encargado: empleado,
// });
// const holdingSchema = new normalizr.schema.Entity("holding", {
//     empresas: [empresa],
// });

// const holdingNormalizado = normalizar(holding, holdingSchema);
// const holdingDesnormalizado = desnormalizar(
//     holdingNormalizado.result,
//     holdingSchema,
//     holdingNormalizado.entities
// );
// const lengthNormalizado = getLength(holdingNormalizado);
// const lengthDesormalizado = getLength(holdingDesnormalizado);
// const porcentajeReducido = (lengthNormalizado * 100) / lengthDesormalizado
// console.log("NORMALIZADO: ", lengthNormalizado);
// console.log("DESNORMALIZADO: ", lengthDesormalizado);
// console.log("PORCENTAJE REDUCIDO: ", porcentajeReducido);
// mostrar(holdingNormalizado);





//------------------------------------------------------------------------------------------------------------------//





// const originData = require('../ejemplo_vivo.json')
// const normalz = require('normalizr')
// const normalizar = normalz.normalize
// const desnormalizar = normalz.denormalize
// const util = require('util');

// const userSchema = new normalz.schema.Entity('users')
// // {
// //     "id": string,
// //     "nombre": string,
// //     "apellido": string,
// //     "DNI": string,
// //     "direccion": string,
// //     "telefono": string
// // }
// const commentSchema = new normalz.schema.Entity('comments', {
//     commenter: userSchema
// })
// // {"commenter": userSchema}
// const articleSchema = new normalz.schema.Entity('article', {
//     author: userSchema,
//     comments: [commentSchema]
// })

// // "author":userSchema,
// // "comments": [commentSchema]
// const postSchema = new normalz.schema.Entity('posts', {
//     posts: [articleSchema]
// })

// const mostar = (obj) => console.log = ('-------') + console.log(util.inspect(obj, false, 12, true));

// const objNormalizado = normalizar(originData, postSchema)

// const objDesnormalizado = desnormalizar(objNormalizado.result, postSchema, objNormalizado.entities)

// console.log('CANTIDAD DE CARACTERES ORIGINAL: ', JSON.stringify(originData).length)
// console.log('CANTIDAD DE CARACTERES DESNORMALIZADO: ', JSON.stringify(objDesnormalizado).length)
// console.log('CANTIDAD DE CARACTERES NORMALIZADO: ', JSON.stringify(objNormalizado).length)

// mostar(objNormalizado)