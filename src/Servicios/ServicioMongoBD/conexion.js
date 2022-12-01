
import mongoose from "mongoose";
import { config } from "../../Configuracion/index.js";


const init = async () => {
    try {
        mongoose.connect(config.DATABASES.mongo.url, {
            dbName: config.DATABASES.mongo.dbName,
            user: config.DATABASES.mongo.user,
            pass: config.DATABASES.mongo.pass,
        });
        console.log("La conexión con MongoBD establecida con exito");

        await usuarios.insertMany({ nombre: 'Lucas', apellido: 'Blanco', dni: '30355874' }, { nombre: 'Maria', apellido: 'Garcia', dni: '29575148' }, { nombre: 'Tomás', apellido: 'Sierra', dni: '38654790' }, { nombre: 'Carlos', apellido: 'Fernández', dni: '26935670' }, { nombre: 'Carlos', apellido: 'Fernández', dni: '26935670' });

        console.log(await usuarios.find())
    } catch (error) {
        console.log(error);
    }
};

export const servicioMongoDB = {
    init,
};


// USUARIO
// pepito

// CONTRA
// asd123

// NOMBRE BD
// ecommerce

// URL
// mongodb+srv://${user}:${pass}@cluster0.ycmrr2m.mongodb.net/?retryWrites=true&w=majority&dbName=${databaseName}


// AGREGAR 1 +

// { nombre: 'Federico', apellido: 'Pérez', dni: '320118321' }