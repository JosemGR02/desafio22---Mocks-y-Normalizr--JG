
// imports
import express from "express";
import { Server as ServidorHttp } from "http";
import { Server as ServidorIO } from "socket.io";
import { DaoMensaje, DaoProducto, DaoCarrito, DaoChat } from "./Dao/index.js";
import handlebars from "express-handlebars";
import { errorMiddleware } from './Middlewares/index.js';
import { RutaMensajes, RutaCarrito, RutaProductosTest, RutaProducto } from "./Rutas/index.js";


// daysjsa
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
dayjs.extend(customParseFormat)


const PORT = 8080;

const app = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'))

// Middleware del error
app.use(errorMiddleware);

// IO
const servidorHttp = new ServidorHttp(app);
const io = new ServidorIO(servidorHttp);


//Motor de plantilla
app.engine("hbs", handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs" }));

app.set("view engine", "hbs");
app.set("views", "./views");


//Rutas
app.use('/api/mensajes', RutaMensajes)
app.use('/api/productos', RutaProducto)
app.use('/api/carrito', RutaCarrito)
app.use('/api/productos-test', RutaProductosTest)


//Servidor
servidorHttp.listen(PORT, () => { console.log(`Servidor escuchando en puerto: ${PORT}`) })


// EVENTOS

// conexion usuarios

io.on('connection', socket => {
    console.log(`usuario conectado ${socket.id}`);
    enviarTodosProds()
    enviarTodosMsjs()

    socket.on('nuevo producto', nuevoProd => {
        nuevoProducto(socket, io, nuevoProd)
    })

    socket.on('nuevo mensaje', nuevoMsg => {
        nuevoMensaje(socket, io, nuevoMsg)
    })
})


// enviar todos

const enviarTodosProds = async (socket) => {
    const todosProds = await DaoProducto.obtenerTodos()
    io.sockets.emit('todos los productos', todosProds)
}

const enviarTodosMsjs = async (socket) => {
    const todosMsjs = await DaoMensaje.obtenerTodos()
    const porcentajeCompresion = await DaoMensaje.obtenerTodos()
    io.sockets.emit('todos los mensajes', todosMsjs, porcentajeCompresion)
}



// nuevo mensaje

const nuevoMensaje = async (socket, io, nuevoMsj) => {
    const fecha = new Date()
    const fechaFormateada = dayjs(fecha).format('DD/MM/YYYY hh:mm:ss')
    console.log("fecha formateada", fechaFormateada)
    await DaoMensaje.guardar({ msj: nuevoMsj, createDate: `${fechaFormateada} hs` })

    const todosMsjs = await DaoMensaje.obtenerTodos()
    const porcentajeCompresion = await DaoMensaje.obtenerTodos()
    io.sockets.emit('todos los mensajes', todosMsjs, porcentajeCompresion)
}

// nuevo producto

const nuevoProducto = async (socket, io, nuevoProd) => {
    await DaoProducto.guardar(nuevoProd)
    const todosProds = await DaoProducto.obtenerTodos()
    io.sockets.emit('todos los productos', todosProds)
}



//----------------------------------------------------------------------------------------------------------//



// base datos mensajes

//  [
//     {
//        "email": "alan@mail.com",
//        "text": "hola",
//        "timestamp": "24/10/2022 19:14:46",
//        "id": 1
//     }
//  ]



// base datos productos

//   [
//     {
//       "Título" : " Mac M1 " ,
//       "Precio" : " 123 " ,
//       "Thumbnail" : " https://www.apple.com/la/mac/why-mac/images/overview/hero__dg0dsnic3gia_large.png " ,,
//       "identificación" : 1
//     }
//   ]



