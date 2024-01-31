import { useState } from "react";
import InputLabel from "./InputLabel";
import Image from "next/image";
import { Validaciones, useInputHandles } from "../utilities/InputControl";
import { apiUrl, HEADERSPOST } from "../Const";
import { useRouter } from "next/navigation";

const Register = ({ changeState }) => {
  const Correo = useInputHandles({ type: "email" });
  const Nombre = useInputHandles({ type: "none" });
  const Usuario = useInputHandles({ type: "user" });
  const Contraseña = useInputHandles({ type: "password" });
  const [typeUser, setTypeUser] = useState(-1);
  const [typeUserError, setTypeUserError] = useState("");
  const [errorsToServer, setErrorsToServer] = useState("");
  const router = useRouter();

  const validate = () => {
    setErrorsToServer("");
    let validated = false;
    const inputs = [Correo, Nombre, Usuario, Contraseña];
    for (let input of inputs) {
      const validacion = Validaciones(input);
      if (validacion) validated = true;
    }

    if (typeUser == -1) {
      setTypeUserError("Seleccione un tipo de usuario");
      validated = true;
    }

    if (validated) {
      return false;
    }

    return true;
  };

  const createNewUser = async (event) => {
    event.preventDefault();

    if (validate()) {
      const body = {
        correo: Correo.text,
        nombre: Nombre.text,
        usuario: Usuario.text,
        contraseña: Contraseña.text,
        tipoUsuario: typeUser,
      };

      try {
        const data = await fetch(`${apiUrl}CreateUser`, {
          ...HEADERSPOST,
          body: JSON.stringify(body),
        });

        if (!data.ok) throw new Error("Error de servidor, intente más tarde");

        const res = await data.json();

        if (res?.error) {
          throw new Error(res.error);
          setErrorsToServer(res.error);
        }
        const token = res.token;
        document.cookie = `token=${token}`;
        sessionStorage.setItem("userData", JSON.stringify({
          usu_id: res.usu_id,
          usu_nombre: body.nombre,
          usu_tipousuario: body.tipoUsuario,
        }));
        router.push("/reunion");
      } catch (error) {
        console.log(error);
        setErrorsToServer(error.message);
      }
    }
  };

  const loginUser = () => {
    //resetear todos los inputs
    Correo.handleChange("");
    Nombre.handleChange("");
    Usuario.handleChange("");
    Contraseña.handleChange("");
    changeState(true);
  };
  return (
    <div className="contRegister">
      <div className="titleRegister">
        <div>
          <h1>Bienvenido</h1>
          <span>Ingresa tus datos para registrarte</span>
        </div>
        <div>
          <Image src="/Logo.svg" alt="Logo" width={100} height={100} />
        </div>
      </div>
      <form className="form" onSubmit={createNewUser}>
        <InputLabel
          type="text"
          placeholder="Escriba su correo electrónico"
          label="Correo"
          handler={Correo}
        />
        <InputLabel
          type="text"
          placeholder="Escriba su nombre"
          label="Nombre completo"
          handler={Nombre}
        />
        <InputLabel
          type="text"
          placeholder="Escriba su nombre de usuario"
          label="Usuario"
          handler={Usuario}
        />
        <InputLabel
          type="password"
          placeholder="Escriba su contraseña"
          label="Contraseña"
          handler={Contraseña}
        />
        <div className="contInput">
          <label>Tipo de usuario</label>
          <div className="contTypeUser">
            <div
              onClick={() => {
                setTypeUser(1);
              }}
              className={`${
                typeUser == 1 ? "typeUserActive" : "typeUserDisabled"
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_204_1337)">
                  <path
                    d="M8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11C13.0609 11 14.0783 10.5786 14.8284 9.82843C15.5786 9.07828 16 8.06087 16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_204_1337">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span>usuario</span>
            </div>
            <div
              onClick={() => {
                setTypeUser(2);
              }}
              className={`${
                typeUser == 2 ? "typeUserActive" : "typeUserDisabled"
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_204_1362)">
                  <path
                    d="M8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11C13.0609 11 14.0783 10.5786 14.8284 9.82843C15.5786 9.07828 16 8.06087 16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7Z"
                    stroke="#194C73"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14"
                    stroke="#194C73"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 19L17 21L21 17"
                    stroke="#194C73"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_204_1362">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span>Moderador</span>
            </div>
          </div>
          {typeUserError != "" ? (
            <span className="conterrorInput">{typeUserError}</span>
          ) : null}
        </div>
        <input className="btnSubmit" type="submit" value={"Registrarse"} />
      </form>
      <div className="conTextLink">
        <span className="textOpaque">¿Ya tienes una cuenta?</span>
        <span onClick={loginUser} className="textAction">
          {" "}
          Inicia sesión.
        </span>
      </div>
      {setErrorsToServer != "" ? (
        <div className="conterrorInputBig">
          <span>{errorsToServer}</span>
        </div>
      ) : null}
    </div>
  );
};

export default Register;
