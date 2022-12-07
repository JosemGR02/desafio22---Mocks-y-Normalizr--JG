
import { Router } from 'express';

const Ruta = Router()

Ruta.get('/', Ruta)


export { Ruta }
export { RutaProducto } from "./productos/prod.js";
export { RutaCarrito } from "./carritos/cart.js";
export { RutaProductosTest } from "./productos/productos-test.js";