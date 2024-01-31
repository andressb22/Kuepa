"use client";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import EmojiList from "../../../componets/EmojiList";
import { apiUrl, HEADERSPOST } from "../../../Const";

const socket = io("http://localhost:5000");
const colors = ["#1F8949", "#194C73", "#EB236B"];

const Reunion = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [dataUser, setDataUser] = useState({
    usu_id: -1,
    usu_nombre: "",
    usu_tipousuario: 0,
  });
  const [activateMenuEmojis, setActivateMenuEmojis] = useState(false);
  const [index, setIndex] = useState(0);
  const [cantidadUsuarios, setCantidadUsuario] = useState(0);
  const router = useRouter();

  useEffect(() => {
    
    const dataUser = JSON.parse(sessionStorage.getItem("userData"));

    if (dataUser === null) router.back();
    setDataUser(dataUser);
    getLastChats();

    socket.on("getMessage", (dataMessage) => {
      recibeMessage(dataMessage);
    });


    return () => {
      socket.off("getMessage");
    };
  }, []);

  const getLastChats = async () => {
    try {
      const data = await fetch(`${apiUrl}getLastMessages`, {
        ...HEADERSPOST,
        body: JSON.stringify({ index }),
      });

      if (!data.ok) throw new Error("Error de servidor");

      const res = await data.json();

      const oldMessages = res.map((el) => {
        return {
          ...el,
          fecha: obtenerHora24Horas(el.fecha),
        };
      });
      setIndex(index + 10);
      setMessages(oldMessages.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const recibeMessage = (dataMessage) =>
    setMessages((state) => [
      { ...dataMessage, fecha: obtenerHora24Horas(dataMessage.fecha) },
      ...state,
    ]);

  const obtenerHora24Horas = (fecha) => {
    const fechaActual = new Date(fecha);
    let horas = fechaActual.getHours();
    let minutos = fechaActual.getMinutes();

    horas = horas < 10 ? "0" + horas : horas;
    minutos = minutos < 10 ? "0" + minutos : minutos;

    const hora24Horas = horas + ":" + minutos;

    return hora24Horas;
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message != "") {
      const fecha = new Date();
      const dataMessage = {
        usu_id: dataUser.usu_id,
        usu_nombre: dataUser.usu_nombre,
        usu_tipousuario: dataUser.usu_tipousuario,
        message,
        fecha,
      };

      recibeMessage(dataMessage);

      setMessage("");
      socket.emit("sendMessage", dataMessage);
    }
  };

  const insertEmoji = (emoji) => {
    setMessage(message + emoji);
  };

  return (
    <div className="contStream">
      <div className="stream">
        <video
          autoPlay={true}
          loop={true}
          muted={true}
          src="/video.mp4"
        ></video>
      </div>
      <div className="contChat">
        <div className="headerChat">
          <div className="titleChat">
            <span>Clase sobre programación basica</span>
          </div>
        </div>
        <div className="contMessage">
          {messages.reverse().map((item, index) => (
            <div
              key={index}
              className={`message ${
                item.usu_id === dataUser.usu_id
                  ? "message-Rigth"
                  : "message-left"
              }`}
            >
              <div>
                <div
                  style={{ color: colors[(item.usu_id % 3 )] }}
                  className="nameMessage"
                >
                  <span> {item.usu_nombre}</span>
                  <span style={{ fontWeight: "700" }}>
                    {item.usu_tipousuario === 2 ? " (moderador) " : ""}
                  </span>
                </div>
                <div>{item.message}</div>
                <div className="fechaMessage">
                  <span>{item.fecha}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="footerChat">
          <div className="contInputChat">
            {activateMenuEmojis ? (
              <EmojiList insertEmoji={insertEmoji} />
            ) : null}

            <svg
              onClick={() => {
                setActivateMenuEmojis(!activateMenuEmojis);
              }}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 1.33989C16.5083 2.21075 17.7629 3.46042 18.6398 4.96519C19.5167 6.46997 19.9854 8.17766 19.9994 9.91923C20.0135 11.6608 19.5725 13.3758 18.72 14.8946C17.8676 16.4133 16.6332 17.6831 15.1392 18.5782C13.6452 19.4733 11.9434 19.9627 10.2021 19.998C8.46083 20.0332 6.74055 19.6131 5.21155 18.7791C3.68256 17.9452 2.39787 16.7264 1.48467 15.2434C0.571462 13.7604 0.0614093 12.0646 0.00500011 10.3239L0 9.99989L0.00500011 9.67589C0.0610032 7.94888 0.563548 6.26585 1.46364 4.79089C2.36373 3.31592 3.63065 2.09934 5.14089 1.25977C6.65113 0.420205 8.35315 -0.0137108 10.081 0.000330246C11.8089 0.0143713 13.5036 0.47589 15 1.33989ZM13 10.9999H7C6.73478 10.9999 6.48043 11.1052 6.29289 11.2928C6.10536 11.4803 6 11.7347 6 11.9999V12.0499C6.00002 13.0698 6.3921 14.0508 7.09512 14.7897C7.79815 15.5287 8.75832 15.9691 9.777 16.0199L10.004 16.0249C11.0259 16.0175 12.0067 15.6218 12.7476 14.918C13.4886 14.2142 13.9341 13.255 13.994 12.2349L14 12.0289C14.0039 11.8952 13.9809 11.762 13.9324 11.6373C13.8839 11.5126 13.8108 11.3989 13.7176 11.303C13.6243 11.207 13.5128 11.1307 13.3895 11.0787C13.2662 11.0266 13.1338 10.9998 13 10.9999ZM7.01 5.99989L6.883 6.00689C6.6299 6.037 6.39785 6.16261 6.23426 6.35806C6.07067 6.55351 5.98789 6.80406 6.00283 7.0585C6.01776 7.31294 6.1293 7.55208 6.31463 7.72704C6.49997 7.90201 6.74512 7.99961 7 7.99989L7.127 7.99289C7.3801 7.96279 7.61214 7.83718 7.77573 7.64173C7.93933 7.44627 8.02211 7.19573 8.00717 6.94129C7.99223 6.68685 7.8807 6.44771 7.69537 6.27274C7.51003 6.09777 7.26488 6.00018 7.01 5.99989ZM13.01 5.99989L12.883 6.00689C12.6299 6.037 12.3979 6.16261 12.2343 6.35806C12.0707 6.55351 11.9879 6.80406 12.0028 7.0585C12.0178 7.31294 12.1293 7.55208 12.3146 7.72704C12.5 7.90201 12.7451 7.99961 13 7.99989L13.127 7.99289C13.3801 7.96279 13.6121 7.83718 13.7757 7.64173C13.9393 7.44627 14.0221 7.19573 14.0072 6.94129C13.9922 6.68685 13.8807 6.44771 13.6954 6.27274C13.51 6.09777 13.2649 6.00018 13.01 5.99989Z"
                fill="#223C4F"
              />
            </svg>

            <input
              value={message}
              placeholder="Escribe algo..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
          <div>
            <button type="submit">
              <svg
                width="25"
                height="24"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.06544 0.0261301L18.0654 8.02613C18.0654 8.02613 19.0654 8.47384 19.0654 9.02613C19.0654 9.57841 18.0654 10.0261 18.0654 10.0261L2.06544 18.0261C2.06544 18.0261 1.39755 18.3035 0.565442 17.5261C-0.26667 16.7488 0.0654415 15.5261 0.0654415 15.5261L2.56544 9.02613L0.0654415 2.02613C0.0654415 2.02613 -0.132804 1.22488 0.565442 0.52613C1.26369 -0.172615 2.06544 0.0261301 2.06544 0.0261301ZM13.5654 8.02613L2.56544 2.52613L4.56544 8.02613H13.5654ZM2.56544 15.5261L4.56544 10.0261H13.5654L2.56544 15.5261Z"
                  fill="#194C73"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reunion;
