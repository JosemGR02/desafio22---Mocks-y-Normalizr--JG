
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

const comprencionTotal = obtenerPorcentaje(elementoNormal, elementOriginal);


export { datosDesnormalizados, comprencionTotal };



// --------------------------------------------------------------------------------------------------//


// const mostrar = (objeto) => {
//     console.log(util.inspect(objeto, false, 12, true));
// };


// mostrar(holdingNormalizado);




// --------------------------------------------------------------------------------------------------//

