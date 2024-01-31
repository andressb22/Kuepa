const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const saveMessage = async (usuId, message, fecha) => {
  try {
    const { pool } = require("./db");
    await pool.query(
      `INSERT INTO men_mensajes(usu_id,men_texto,men_fecha) VALUES($1,$2,$3)`,
      [usuId, message, fecha]
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};


io.on("connection", (socket) => {
  console.log("cliente conected");

  socket.on("sendMessage", (dataMessage) => {
    //guardar mensaje
    console.log("mse", dataMessage);
    saveMessage(dataMessage.usu_id,dataMessage.message,dataMessage.fecha)
    socket.broadcast.emit("getMessage", dataMessage);
  });
});

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(require("./routes/seguridad"));
app.use(require("./routes/messages"));

server.listen(5000);
console.log("servidor corriendo en puerto 5000");
