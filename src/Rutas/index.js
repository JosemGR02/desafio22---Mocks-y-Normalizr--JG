
import { Ruta } from 'express';
import { rutaProductos } from '../Controladores/mock_controladores.js';


const ruta = Ruta();


ruta.use("/productos", rutaProductos);

export { ruta };

