

import { faker } from '@faker-js/faker';
faker.locale = "es";


const crearProductoFake = {
    id: faker.datatype.uuid(),
    titulo: faker.commerce.productName(),
    precio: faker.commerce.price(),
    imagen: faker.image.business()
};

export { crearProductoFake };








