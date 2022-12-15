const normalizr = require('normalizr');
const normalizar = normalizr.normalize;
const desnormalizar = normalizr.denormalize;
const util = require('util');
const holding = require('../holding.json')
const usersSchema = new normalizr.schema.Entity('users');

const empresaSchema = new normalizr.schema.Entity('empresa', {
    gerente: usersSchema,
    encargado: usersSchema,
    empleados: [usersSchema]

});
const holdingSchema = new normalizr.schema.Entity('holding', {
    empresas: [empresaSchema]
});

const data_normalizada = normalizar(holding, holdingSchema);
const utils = (objeto) => {
    console.log(util.inspect(objeto, false, 12, true));
}
utils(data_normalizada);
console.log('Antes: ', JSON.stringify(holding).length);
console.log('Después: ', JSON.stringify(data_normalizada).length);




// Normalización y desnormalización con redundancia
// Dado el objeto en formato JSON holding.json (disponible en la carpeta de la clase) que representa la información correspondiente a un grupo de empresas:
// Definir el esquema de normalización.
// Obtener el objeto normalizado e imprimirlo por consola.
// Desnormalizar el objeto obtenido en el punto anterior.
// Imprimir la longitud del objeto original, del normalizado y del desnormalizado
// Imprimir el porcentaje de compresión del proceso de normalización.
// Comparar y analizar los resultados.