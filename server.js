//dependencias del proyecto 
const express = require ('express')
const dotenv = require ('dotenv')
const colors = require ('colors')

//dependencia de bases de datos
const connectarDB = require("./config/db")

//dependencias de rutas 
const bootcampsRoutes = require('./routes/bootcampsRoutes')
const coursesRoutes = require('./routes/coursesRoutes')
//condigurar dotenv
dotenv.config({
    path: "./config/.env"
})

//conectar bd
connectarDB()

//crear el objeto express
const app = express()

//habilitar express para recibir formato json
app.use(express.json())

//establecer rutas de proyecto 
app.use('/api/v1/bootcamps', bootcampsRoutes)
app.use('/api/v1/courses', coursesRoutes)
//crear el servidor de aplicaciones 
app.listen(process.env.PUERTO, () => {console.log(`servidor express ejecutando${process.env.PUERTO}`.bgCyan.yellow)})