
import { datosDesnormalizados, comprensionTotal } from "../Desnormalizacion/index.js"
const socket = io.connect();

// formularios
const productosForm = document.getElementById('formularioProds')
const mensajesForm = document.getElementById('formularioMjs')

// contenedores
const contenedorProds = document.getElementById('contenedorProductos')
const contenedorChat = document.getElementById('contenedorMensajes')
const contenedorXcentaje = document.getElementById('contenedorCompresion')



// RENDERS

// render productos
const limpiarProds = () => {
    contenedorProds.innerHTML = ""
}
const ProductosRenderizados = async (productos) => {
    let respuesta = await fetch('/assets/templates/productoTemplate.hbs');
    const template = await respuesta.text()
    const templateCompilado = Handlebars.compile(template)
    const html = templateCompilado({ productos })
    contenedorProds.innerHTML = html
}

// render mensajeria
const limpiarChat = () => {
    contenedorChat.innerHTML = ""
}

const mensajesRenderizados = async (MensajesDenormalizados) => {
    let respuesta = await fetch('/assets/templates/mensajeriaTemplate.hbs');
    const template = await respuesta.text()
    const templateCompilado = Handlebars.compile(template)
    const html = templateCompilado({ MensajesDenormalizados })
    contenedorChat.innerHTML = html
}


const renderComprensionMensajes = async (comprensionTotal) => {
    let respuesta = await fetch('/assets/templates/mensajeriaTemplate.hbs');
    const template = await respuesta.text()
    const templateCompilado = Handlebars.compile(template)
    const html = templateCompilado({ comprensionTotal })
    contenedorXcentaje.innerHTML = html
}


// LISTENERS

// Listeners Productos
productosForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new FormData(productosForm)
    const valoresFormulario = Object.fromEntries(datosFormulario)
    productosForm.reset();
    socket.emit('nuevo producto', valoresFormulario);
})


// Listeners Mensajeria
mensajesForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new FormData(mensajesForm)
    const valoresformulario = Object.fromEntries(datosFormulario)
    console.log(valoresformulario);
    mensajesForm.reset();
    socket.emit('nuevo mensaje', valoresformulario);
})

// EVENTOS

// Eventos Productos
socket.on('todos los productos', todosProds => {
    productos = todosProds
    limpiarProds()
    ProductosRenderizados(todosProds)
})


// Eventos mensajeria
socket.on('todos los mensajes', todosMsgs => {
    mensajes = todosMsgs
    limpiarChat()
    mensajesRenderizados(todosMsgs)
})


// Eventos mensajeria
socket.on('todos los mensajes', todosMsgs, porcentajeCompresion => {
    mensajes = todosMsgs
    comprensionTotal = porcentajeCompresion
    limpiarChat()
    mensajesRenderizados(todosMsgs)
    renderComprensionMensajes(porcentajeCompresion)
})

