import React from "react";
import Image from "next/image";

const MultimediaContent = ({ loginActive }) => {
  return (
    <div
      className={`contMultimedia ${loginActive ? "moveLogin" : "moveRegister"}`}
    >
      <div className="contImageMultimedia">
        <Image src="/imageHome.svg" alt="Logo" width={431} height={431} />
      </div>
      <div>
        <h2>{loginActive ? "Iniciar sesión" : "Registrate"}</h2>
        {loginActive ? (
          <p>
            ¡Bienvenido/a a nuestra emocionante plataforma de educación virtual!
            Descubre un mundo de aprendizaje interactivo y personalizado. ¡Únete
            ahora para acceder a cursos de alta calidad, recursos educativos
            innovadores y una comunidad de aprendices apasionados! Inicia sesión
            y comienza tu viaje educativo hoy mismo. ¡Juntos, construiremos un
            futuro lleno de conocimiento y éxito!
          </p>
        ) : (
          <p>
            Regístrate ahora para acceder a clases remotas de alta calidad desde
            cualquier lugar. Tu camino hacia el aprendizaje flexible y
            enriquecedor comienza aquí. ¡Únete a nuestra comunidad educativa hoy
            mismo!
          </p>
        )}
      </div>
    </div>
  );
};

export default MultimediaContent;
