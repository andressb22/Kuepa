const Router = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const { jsonKey } = require("../../config");

router.post('/getLastMessages',(req,res)=>{
    const {index} = req.body

    
    const {pool} = require('../db')
    const getLastMessages = async ()=>{
        try{
            const data = await pool.query(`SELECT 
                men.men_texto as message,
                men.men_fecha as fecha,
                usu.usu_id as usu_id,
                usu.usu_nombre as usu_nombre,
                usu.usu_tipousuario as usu_tipousuario
                FROM men_mensajes men
                INNER JOIN usu_usuario usu
                on men.usu_id = usu.usu_id
                ORDER BY men_fecha DESC
                LIMIT 20
                OFFSET $1;`,
                [index])

            const result = data.rows    

            res.status(200).json(result)
        }
        catch(error){
            console.log(error)
            res.status(500).json({error:error.message})
        }
    }

    getLastMessages()
})

module.exports = router;