const Router = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const { jsonKey } = require("../../config");

const generateToken = (usuid) => {
  return jwt.sign({ usuid }, jsonKey, { expiresIn: 60 * 60 * 60 });
};

const validateToken = (req, res, next) => {
  const accessToken = req.headers["authorization"];

  if (!accessToken) res.send("Acceso denegado");

  jwt.verify(accessToken, jsonKey, (err, user) => {
    if (err) {
      res.send("Acceso denegado, sesión expirada o incorrecta.");
    } else {
      next();
    }
  });
};

router.post("/LogIn", (req, res) => {
  const { usuario, contraseña } = req.body;
  const { pool } = require("../db");

  const LogIn = async () => {
    try {
      const data = await pool.query(
        `SELECT usu_id,usu_nombre,usu_tipousuario FROM usu_usuario WHERE usu_usuario = $1 
                AND usu_password = md5($2)`,
        [usuario, contraseña]
      );

      const result = data.rows;

      if (result.length > 0) {
        const token = generateToken(result[0].usu_id);
        res
          .status(200)
          .json({
            token,
            usu_id: result[0].usu_id,
            usu_nombre: result[0].usu_nombre,
            usu_tipousuario: result[0].usu_tipousuario,
          });
      } else {
        res.status(200).json({ error: "Usuario o contraseña incorrectos" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  LogIn();
});

router.post("/CreateUser", (req, res) => {
  const { correo, nombre, usuario, contraseña, tipoUsuario } = req.body;
  const { pool } = require("../db");

  const createUser = async () => {
    try {
      const data = await pool.query(
        `
                INSERT INTO usu_usuario(usu_usuario,usu_nombre,usu_password,usu_correo,usu_tipousuario)
                VALUES($1,$2,md5($3),$4,$5)
                RETURNING usu_id`,
        [usuario, nombre, contraseña, correo, tipoUsuario]
      );

      const { usu_id } = data.rows[0];

      const token = generateToken(usu_id);

      res.status(200).json({ token,usu_id });
    } catch (error) {
      console.log(error);
      if (error.code == "23505") {
        res.status(200).json({ error: "Usuario o correo ya registrados" });
        return;
      }

      res.status(500).json({ error: "Error de servidor" });
    }
  };

  createUser();
});

module.exports = router;
