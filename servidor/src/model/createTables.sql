CREATE TABLE usu_usuario (
	usu_id serial primary key,
	usu_usuario varchar(60) UNIQUE,
	usu_nombre varchar(100),
	usu_password varchar(100),
	usu_correo text UNIQUE,
	usu_tipousuario integer
);

create table men_mensajes (
	men_id serial primary key,
	usu_id integer REFERENCES usu_usuario(usu_id),
	men_texto text,
	men_fecha timestamp	
);