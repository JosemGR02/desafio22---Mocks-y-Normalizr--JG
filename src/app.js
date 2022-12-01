
// imports
import express from "express";
import { Server as ServidorHttp } from "http";
import { Server as ServidorIO } from "socket.io";
import { daoMensajes, daoProductos } from "./Dao/index.js";
import handlebars from "express-handlebars";
import { errorMiddleware } from './Middleware/error_middleware.js'
import { ruta } from "./Rutas/index.js";


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


//Ruta
app.use('/api', ruta)


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
    const todosProds = await daoProductos.obtenerTodos()
    io.sockets.emit('todos los productos', todosProds)
}

const enviarTodosMsjs = async (socket) => {
    const todosMsjs = await daoMensajes.obtenerTodos()
    io.sockets.emit('todos los mensajes', todosMsjs)
}



// nuevo mensaje

const nuevoMensaje = async (socket, io, nuevoMsj) => {
    const fecha = new Date()
    const fechaFormateada = dayjs(fecha).format('DD/MM/YYYY hh:mm:ss')
    console.log("fecha formateada", fechaFormateada)
    await daoMensajes.guardar({ msj: nuevoMsj, createDate: `${fechaFormateada} hs` })

    const todosMsjs = await daoMensajes.obtenerTodos()
    io.sockets.emit('todos los mensajes', todosMsjs)
}


// nuevo producto

const nuevoProducto = async (socket, io, nuevoProd) => {
    await daoProductos.guardar(nuevoProd)
    const todosProds = await daoProductos.obtenerTodos()
    io.sockets.emit('todos los productos', todosProds)
}



// base datos mensajes

//  [
//     {
//        "email": "alan@mail.com",
//        "text": "hola",
//        "timestamp": "24/10/2022 19:14:46",
//        "id": 1
//     },
//     {
//        "email": "alan@filesystem.com",
//        "text": "hola",
//        "timestamp": "8/11/2022 20:22:26",
//        "id": 2
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




/////////////////////////////////////////////////////////////////////////


// knex conjunto datos


// const products = [
//     {
//       title: "mac m1",
//       price: "123",
//       thumbnail:
//         "https://www.apple.com/la/mac/why-mac/images/overview/hero__dg0dsnic3gia_large.png",
//     },
//     {
//       title: "mac m2",
//       price: "123",
//       thumbnail:
//         "https://www.apple.com/la/mac/why-mac/images/overview/hero__dg0dsnic3gia_large.png",
//     },
//     {
//       title: "mac m1 pro",
//       price: "123",
//       thumbnail:
//         "https://www.apple.com/la/mac/why-mac/images/overview/hero__dg0dsnic3gia_large.png",
//     },
//   ];

//   const messages = [
//     {
//       id: 1,
//       email: "alan@jsx.com",
//       text: "Hola!!!! ",
//       timestamp: "15/7/2022 19:11:14",
//     },
//     {
//       id: 2,
//       email: "alan@jsx.com",
//       text: "¿Cómo están??",
//       timestamp: "15/7/2022 19:11:26",
//     },
//     {
//       id: 3,
//       email: "32140@jsx.com",
//       text: "Avanzandoooo todos juntos 😎",
//       timestamp: "15/7/2022 19:11:51",
//     },
//   ];



