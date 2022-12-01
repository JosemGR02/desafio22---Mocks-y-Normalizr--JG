
import { crearProductoFake } from '../Utilidades/mock_utils.js';


class mockServicio {
    constructor() {
        this.items = []
    }
    obtenerTodos() {
        return this.items
    }
    obtenerUno(id) {
        return this.items.find(item => item.id == id)
    }
    insertar(obj) {
        this.items.push(obj)
    }
    populate(limite = 5) {
        for (let index = 1; index < limite; index++) {
            this.insert(crearProductoFake())
        }
    }

}
export { mockServicio }



//----------------------------------------------------------------------------------------------------------//


// import { productoFake } from "../Utilidades/mock_utils";

// class servicioMock {
//     items
//     constructor() { }
//     obtenerTodos(qty = 5) {
//         this.items = [];
//         for (let i = 1; i <= qty; i++) {
//             const nuevoItem = productoFake();
//             this.items.push(nuevoItem);
//         }
//         return this.items;
//     }
// }

// export { servicioMock };

//FIREBASE https://console.firebase.google.com/u/0/project/basedatosjosegomez/firestore/data/~2Fproductos~2F3AEratHZs4kjhyCVwAo0?hl=es-419&view=panel-view



