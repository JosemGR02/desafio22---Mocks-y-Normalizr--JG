// NUEVOS MENSAJES

// {
//     autor: {
//         id: "email@445";
//         nombre: "pepito";
//         apellido: "martinez";
//         edad: 34,
//         alias: "el Pepo";
//         avatar: "url"
//     },
//     texto: 'mensaje del usuario'
// }

// {id: 'mensajes', mensajes: []}



// CAMBIAR ID NORMALIZR
// const schemaAuthor = new schema.Entity('author', { ...}, { idAttribute: 'email' });


// FILESYSTEM: const MENSAJES_ARCHIVONOMBRE = "mensajes";


//----------------------------------------------------------------------------------------------------------//



//tabla productos

// CREATE TABLE `primerabasedatos`.`productos` (`id` INT NOT NULL AUTO_INCREMENT , `titulo` VARCHAR(20) NOT NULL , `precio` INT NOT NULL , `imagen` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

//tabla mensajes

//CREATE TABLE `primerabasedatos`.`mensajes` (`id` INT NOT NULL AUTO_INCREMENT , `email` VARCHAR(128) NOT NULL , `texto` TEXT NOT NULL , `marca de tiempo` DATE NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


//----------------------------------------------------------------------------------------------------------//