                              Proyecto Cars Dynamic

El proyecto consiste en crear una pagina web simulando la tienda virtual de una consecionaria de autos, la misma consistira de un login y registro simple hecho con LocalStorage. Una vez ingresado con un usuario se redirigira a la pagina principal, el cual a traves de una lista de objetos, generara dinamicamente (con JS) los automoviles a ofrecer. Luego se creara un carrito de compras donde se almacenaran los vehiculos elegidos por el usuario. En la misma podran consultar y eliminar los productos.


El proyecto utilizara NODE.JS con las tecnologias "SASS" Y "GULP", en el package.json se encuentran listadas, las mismas fueron istaladas como dependencias de desarrollo (-save--dev).
Para iniciar el proyecto se requiere la instalacion de dichas dependencias.

Usando la terminal tipea lo siguiente:

npm init

Automaticamente descargara los recursos ya previstos en el package.json.


Dia 1:

Como primera instancia se crea los directorios src con sus respectivas ramas "scss" y "js". Luego se procede a crear el "GULPFILE.JS", la misma contiene los scrip que nos permitira compilar nuestros archivos de tipo .scss a una hoja de estilos CSS ubicada en /build/css, esta es la hoja de estilos que se referenciara en "indexLogin".

