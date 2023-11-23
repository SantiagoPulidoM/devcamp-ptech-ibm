const mongoose=require('mongoose')

//definir el schema
//plano ral d etodo bootcamp 

const coursesSchema =new mongoose.Schema({
    title:{
        type:String,
        required:[true, "titulo requerido" ],
        unique: [true,"titulo repetido"],
        minlength:[10, "titulo muy corta"],
        maxlength:[30, "titulo muy corta"]
    },
    description:{
        type:String,
        required:[true, "descripcion requerida" ],
        minlength:[10, "descripcion muy corta"]
    },
    weeks:{
        type:Number,
        required:[true, "semanas requeridas" ],
        max:[9, "el numero maximo de semanas es 9"],
        minlength:[1, "duracion muy corta"]
    },
    enroll_cost:{
        type:Number,
        required:[true, "costo requerido" ]

    },
    minimum_skills:{
        type:[String],
        required:[true, "habilidades minimas requeridas" ],
        enum:["Beginer", "Intermediate", "Advanced", "Expert"]   
    }
})

//exportar el modelo 
const coursesModel = mongoose.model("courses",coursesSchema)
module.exports=coursesModel