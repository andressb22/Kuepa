

## Getting Started

Primero debemos descargar las dependencias tanto del front como del back con npm i.
las dependecias del backend se deben descargar desde el directorio de servidor en este tambien se debe añadir 
un archivo .env con la configuracion de conexion a la base de datos y el secreto del jsonwebtoken

datos del .env:
  -user 
  -password
  -host
  -port
  -database 
  -jsonKey 

luego debemos correr los proyectos en en el front y en el back usamos npm run dev 

para realizar pruebas se debe crear la estructura de la base de datos que se encuentra en la carpeta servidor/src/model/createTables.js
se utiliza postgres en este caso se deben aparte de es configurar las cosas aunque al realizar npm run dev no deberia poner problema a la hora de generar las cors
