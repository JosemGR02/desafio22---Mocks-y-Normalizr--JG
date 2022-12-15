// Inicio web socket
const socket = io.connect();

//---------------------INICIO PRODUCTOS--------------------

// Leer array de productos y lo inyecta en el html
const render = data => {

    const html = data.map((elem, index) => {
        return (
            `  
        <tr>
            <td>
                ${elem.producto}
            </td>
            <td>
                ${elem.precio}
            </td>
            <td>
                <img style="height: 3rem;" src="${elem.urlImagen}" alt="imagen producto">
            </td>
        </tr>
        `
        )
    }).join(' ');
    document.querySelector('#productos').innerHTML = html;
};

// Leer productos nuevos y los inyecta en el html
const renderAdd = data => {

    const html =
        `
        
        <td>
            ${data.producto}
        </td>
        <td>
            ${data.precio}
        </td>
        <td>
            <img style="height: 3rem;" src="${data.urlImagen}" alt="imagen producto">
        </td>
        
	`
    const div = document.createElement('tr')
    div.innerHTML = html
    document.querySelector('#productos').append(div);
};

// Funcion onsubmit para enviar los datos del formulario
const addProduct = e => {
    const producto = {
        producto: document.querySelector('#producto').value,
        precio: document.querySelector('#precio').value,
        urlImagen: document.querySelector('#urlImagen').value
    };

    socket.emit('nuevo producto', producto);
    return false;
}

// Escucha productos de array productos
socket.on("productos", dato => {
    console.log(dato)
    render(dato);
})

// Escucha productos enviados al array (push)
socket.on("productos-push", dato => {
    console.log(dato)
    renderAdd(dato);
})

//---------------------FIN PRODUCTOS--------------------

//---------------------INICIO CHAT--------------------

const renderMessages = data => {
    console.log(data)
    const html = data[0].mensajes.map((elem, index) => {
        return (
            `<div>
				<strong class="text-primary">${elem.author.id}</strong>:
                <span style="color:maroon">[${elem.dateFormated}]</span>
				<i class="text-success">${elem.text}</i>
			</div>`)
    }).join(' ');
    document.querySelector('#messages').innerHTML = html;
};

const renderAddMessages = data => {
    const html = `
		<strong class="text-primary">${data.author.id}</strong>:
        <span style="color:maroon"">[${data.dateFormated}]</span>
		<i class="text-success">${data.text}</i>
	`
    const div = document.createElement('div')
    div.innerHTML = html
    document.querySelector('#messages').append(div);
};

const addMessage = e => {
    const message = {
        author: {
            id: document.querySelector('#username').value,
            nombre: document.querySelector('#nombre').value,
            apellido: document.querySelector('#apellido').value,
            edad: document.querySelector('#edad').value,
            alias: document.querySelector('#alias').value,
            avatar: document.querySelector('#urlLogo').value
        },

        text: document.querySelector('#text').value

    };
    socket.emit('new-message', message);
    return false;
}

socket.on('messages', data => {
    renderMessages(data);
})
socket.on('messages-push', data => {
    renderAddMessages(data);
})


//---------------------FIN CHAT--------------------