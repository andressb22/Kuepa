import { useState } from "react";
import Image from "next/image";
import InputLabel from "./InputLabel";
import { Validaciones, useInputHandles } from "../utilities/InputControl";
import { useRouter } from "next/navigation";
import { apiUrl, HEADERSPOST } from "../Const";

const Login = ({ changeState }) => {
  const Usuario = useInputHandles({ type: "user" });
  const Contraseña = useInputHandles({ type: "password" });
  const [errorsToServer, setErrorsToServer] = useState("");
  const router = useRouter();

  const validate = () => {
    setErrorsToServer('');
    let validated = false;
    const inputs = [Usuario, Contraseña];
    for (let input of inputs) {
      const validacion = Validaciones(input);
      if (validacion) validated = true;
    }

    if (validated) {
      return false;
    }

    return true;
  };

  const LogIn = async (event) => {
    event.preventDefault();

    if (validate()) {
      try {
        const data = await fetch(`${apiUrl}LogIn`, {
          ...HEADERSPOST,
          body: JSON.stringify({
            usuario: Usuario.text,
            contraseña: Contraseña.text,
          }),
        });

        if (!data.ok) throw new Error("Error de servidor, intente más tarde");

        const res = await data.json();

        if (res?.error) {
          throw new Error(res.error);
        }

        const token = res.token;
        document.cookie = `token=${token}` 
        sessionStorage.setItem("userData", JSON.stringify({
            usu_id :res.usu_id,
            usu_nombre :res.usu_nombre,
            usu_tipousuario :res.usu_tipousuario,
        }));
        router.push("/reunion");
      } catch (error) {
        console.log(error);
        setErrorsToServer(error.message);
      }
    }
  };

  const createAcount = () => {
    //resetear todos los inputs
    Usuario.handleChange("");
    Contraseña.handleChange("");
    changeState(false);
  };

  return (
    <div className="contRegister">
      <div className="logoLeft">
        <Image src="/Logo.svg" alt="Logo" width={100} height={100} />
      </div>
      <div className="titleRegister margin-bottom">
        <div>
          <h1>Bienvenido</h1>
          <span>Ingresa tus datos para registrarte</span>
        </div>
      </div>
      <form onSubmit={LogIn} className="form">
        <InputLabel
          type="text"
          placeholder="Escriba su nombre de usuario"
          label="Usuario "
          handler={Usuario}
        />
        <InputLabel
          type="text"
          placeholder="Escriba su contraseña"
          label="Contraseña"
          handler={Contraseña}
        />
        <div className="aling-rigth">
          <span className="textAction ">¿Olvido su cotraseña?</span>
        </div>
        <input className="btnSubmit" type="submit" value={"Iniciar sesión"} />
        <div className="conTextLink center">
          <span className="textOpaque">¿No tienes una cuenta aún?</span>
          <span onClick={createAcount} className="textAction">
            {" "}
            Crear cuenta.
          </span>
        </div>
      </form>
      {setErrorsToServer != "" ? (
        <div className="conterrorInputBig">
          <span>{errorsToServer}</span>
        </div>
      ) : null}
    </div>
  );
};

export default Login;
