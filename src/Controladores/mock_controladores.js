
import { Ruta } from "express";
import { respuestaExito } from '../Utilidades/api_utils.js';
import { HTTP_STATUS } from '../Constantes/api_contantes.js';
import { servicioMock } from '../Servicios/ServicioMock/index.js';

const servicio = new servicioMock()

const rutas = Ruta();


rutas.get("/", (solicitud, respuesta) => {
    const productos = servicio.obtenerTodos()

    respuesta.status(HTTP_STATUS.OK).json(productos)
});

rutas.get("/:id", (solicitud, respuesta) => {
    const { id } = solicitud.params

    const producto = servicio.obtenerUno(id)

    respuesta.status(HTTP_STATUS.OK).json(producto)
});

rutas.post("/popular", (solicitud, respuesta) => {
    servicio.populate(solicitud.query.limite)

    respuesta.status(HTTP_STATUS.CREATED).json({ create: true })
});

export { rutas };




//-------------------------------------------------------------------------------------------------------------//



// import { Ruta } from "express";
// import { servicioMock } from "../Servicios/mock_servicios";
// import { respuestaExito } from "../Utilidades/api_utils";
// import { HTTP_STATUS } from "../Constantes/api_constantes";


// const rutas = Ruta();
// const servicio = new servicioMock()

// rutas.get("/test", (solicitud, respuesta) => {
//     const productos = servicio.obtenerTodos(solicitud.query.cant);
//     const respuestaProds = respuestaExito(productos);
//     respuesta.status(HTTP_STATUS.OK).json(respuestaProds);
// });

// export { rutas };


//-------------------------------------------------------------------------------------------------------------//


// http://localhost:8080/api/productos/test?cant=3



// POST /api/usuarios/popular?cant=n : si no específico cant me genera 50 objetos mock
// GET /api/usuarios/:id? : con id me trae un mock; sin id devuelve todos los mocks
// POST /api/usuarios : incorpora un nuevo mock
// PUT /api/usuarios/:id : actualiza un mock total o parcialmente por campo
// DELETE /api/usuarios/:id : borra un mock específico






