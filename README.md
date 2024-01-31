

## Cómo instalarlo

Primero debemos descargar las dependencias tanto del front como del back con npm i. Las dependencias del backend se deben descargar desde el directorio de servidor, en este también se debe añadir un archivo .env con la configuración de conexión a la base de datos y el secreto del jsonwebtoken

datos del .env: 
-user 
-password 
-host 
-port 
-database 
-jsonKey

luego debemos correr los proyectos en el front y en el back usamos npm run dev

para realizar pruebas, se debe crear la estructura de la base de datos que se encuentra en la carpeta servidor/src/model/createTables.js. Se utiliza postgres.
