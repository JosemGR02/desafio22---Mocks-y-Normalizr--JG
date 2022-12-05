
import { crearProductosFake } from '../../Utilidades/mocks-utils/faker_utils.js';

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
            this.insert(crearProductosFake())
        }
    }
    actualizar(id, nuevosdatos) {
        const itemIndex = this.items.findIndex((item) => item.id == id);

        if (itemIndex === -1) return null;

        const itemEncontrado = this.items[itemIndex];

        this.items[itemIndex] = {
            ...this.items[itemIndex],
            ...nuevosdatos,
        };

        return this.items[itemIndex];
    }
    eliminar() {
        this.items.filter((item) => item.id != id);
        return { success: true };
    }

}
export { mockServicio }





