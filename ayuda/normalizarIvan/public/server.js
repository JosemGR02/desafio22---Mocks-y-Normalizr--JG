import { Container } from "./containers/Container.js";
import { dbSqlite3 } from './connection/dbSqlite3.js'
import { dbMariaDB } from './connection/dbMariaDB.js'
import { normalize, schema, denormalize } from 'normalizr';
import { inspect } from 'util'
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { MockService } from "./services/mock.service.js";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import { createRequire } from "module"

const require = createRequire(import.meta.url)
const mensajesJson = require("./db/messages.json")
dayjs.extend(customParseFormat)


//Creando servidor de express 
const app = express();
const PORT = 8080;


// Iniciando Socket
const httpServer = createServer(app);
const io = new Server(httpServer);

// api mock 

app.get('/api/productos-test', async (req, res) => {

    const mostrarProductos = new MockService()
    mostrarProductos.getAll(5)
    res.json(mostrarProductos);
})


// Base de datos
const Messages = new Container('messages');
// const Productos = new Container(dbMariaDB, 'productos')
const productos = []
const MockProductos = new MockService();

MockProductos.getAll(5)

console.log()

MockProductos.items.forEach(ele => productos.push(ele))



// Socket connection
io.on("connection", (socket) => {

    console.log("un cliente se a conectado")

    const getProductos = async (socket) => {
        const allProductos = productos
        io.sockets.emit('productos', allProductos)
    }

    getProductos(socket)

    // Productos
    socket.on('nuevo producto', async data => {    // escucho productos que envia el cliente
        productos.push(data)
        console.log(data)
        io.sockets.emit("productos-push", data) // envio el producto a todos los clientes 
    })



    // ejecuto funcion getAllMensajes para enviar base de datos
    getAllMessages(socket)


    // Escucho nuevo mensaje y lo ejecuto con la funcion saveMenssage
    socket.on('new-message', data => {
        console.log(data)
        saveMessage(data)
    })

});

// Creo funcion para enviar base de datos
const getAllMessages = async (socket) => {
    const allMessages = await Messages.getAll()
    io.sockets.emit('messages', allMessages)
}

// Creo funcion para enviar mensajes agregandoles la hora y fecha con dayjs
const saveMessage = async (message) => {
    const date = new Date()
    const dateFormated = dayjs(date).format('DD/MM/YYYY hh:mm:ss');
    const newMessages = { ...message, dateFormated }
    await Messages.save(newMessages);
    const allMessages = await Messages.getAll();
    io.sockets.emit('messages-push', newMessages);
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

const server = httpServer.listen(process.env.PORT || PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));





const myData = mensajesJson;
/* const author = new schema.Entity('author')
const mySchema = { mensajes: [[author]] }; */

const author = new schema.Entity('author')
const mensajes = new schema.Entity('mensajes', {
    author: author,
})

const mySchema = { mensajes: [[mensajes]] };

const normalizedData = normalize(myData, mySchema);
const denormalizedData = denormalize(normalizedData.result, mySchema, normalizedData.entities);

console.log(inspect(normalizedData, false, 12, true))
console.log('--------------------------------')
console.log(inspect(denormalizedData, false, 12, true)) 