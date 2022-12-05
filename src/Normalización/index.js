


import { normalize, denormalize, schema } from 'normalizr';
import util from 'util';



const originalData = {
    id: "4444",
    posts: [
        {
            id: "425",
            autor: { id: "1", nombre: "Fernando", apellido: "Gutierrez", DNI: "76343544", direccion: "Rosario 3773", telefono: "3733546246" },
            titulo: "titulo 1",
            comentarios: [{ id: "633", comentador: { id: "2", nombre: "Martina", apellido: "Buhajeruk", DNI: "43696382", direccion: "Mendoza 3496", telefono: "9466463542" } }, {
                id: "737", comentador: { id: "3", nombre: "Martin", apellido: "Ould ahmed", DNI: "647218223", direccion: "Bahréin 2556", telefono: "4568245336" }
            }]
        },
        {
            id: "633",
            autor: { id: "2", nombre: "Martina", apellido: "Buhajeruk", DNI: "43696382", direccion: "Mendoza 3496", telefono: "9466463542" },
            titulo: "titulo 2",
            comentarios: [{ id: "425", comentador: { id: "1", nombre: "Fernando", apellido: "Gutierrez", DNI: "76343544", direccion: "Rosario 3773", telefono: "3733546246" } }, {
                id: "737", comentador: { id: "3", nombre: "Martin", apellido: "Ould ahmed", DNI: "647218223", direccion: "Bahréin 2556", telefono: "4568245336" }
            }]
        },
        {
            id: "737",
            autor: { id: "3", nombre: "Martin", apellido: "Ould ahmed", DNI: "647218223", direccion: "Bahréin 2556", telefono: "4568245336" },
            titulo: "titulo 3",
            comentarios: [{ id: "633", comentador: { id: "2", nombre: "Martina", apellido: "Buhajeruk", DNI: "43696382", direccion: "Mendoza 3496", telefono: "9466463542" } }, {
                id: "425", comentador: { id: "1", nombre: "Fernando", apellido: "Gutierrez", DNI: "76343544", direccion: "Rosario 3773", telefono: "3733546246" }
            }]
        }
    ]
}


const usuario = new schema.Entity('usuarios')

const comentario = new schema.Entity('comentarios', {
    comentador: usuario
})

const publicacion = new schema.Entity('publicaciones', {
    autor: usuario,
    comentarios: [comentario]
})

const articulos = new schema.Entity('articulos', {
    publicaciones: [publicacion]
})

const datosNormalizados = normalize(originalData, articulos)
console.log('------------------ Data -- Normalizada ------------------');
console.log(datosNormalizados);

const datosDesnormalizados = denormalize(datosNormalizados.result, articulos, datosNormalizados.entities)
console.log('------------------ Data -- Denormalizada ------------------');
console.log(datosDesnormalizados);

const elementoNormal = parseInt(JSON.stringify(datosNormalizados).length)
const elementOriginal = parseInt(JSON.stringify(datosDesnormalizados).length)

console.log(JSON.stringify(originalData).length);
console.log(JSON.stringify(datosDesnormalizados).length);
console.log(JSON.stringify(datosNormalizados).length);

function obtenerPorcentaje(primerElemento, segundoElemento) {
    const porcentaje = ((primerElemento / segundoElemento * 100) - 100).toFixed(2)
    console.log(`El porcentaje de compresion fue del ${porcentaje}%`);
}

obtenerPorcentaje(elementoNormal, elementOriginal)



// --------------------------------------------------------------------------------------------------//


// const mostrar = (objeto) => {
//     console.log(util.inspect(objeto, false, 12, true));
// };


// mostrar(holdingNormalizado);




// --------------------------------------------------------------------------------------------------//

// CAMBIAR ID NORMALIZR
// const schemaAuthor = new schema.Entity('author', { ...}, { idAttribute: 'email' });


// normalizr video youtube
// https://www.youtube.com/watch?v=nuZSmT5ISNk