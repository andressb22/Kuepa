const {config} = require('dotenv')
config()

 

module.exports = {
    db: {
        user: process.env.user ,
        password:process.env.password ,
        host:process.env.host ,
        port:process.env.port ,
        database:process.env.database 
    },
    jsonKey:process.env.jsonKey
}