const mongoose=require('mongoose')

//definir el schema
//plano ral d etodo bootcamp 

const bootcampSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true, "nombre requerido" ],
        unique: [true,"nombre repetido"]
    },
    phone:{
        type:Number,
        required:[true, "telefono requerido" ],
        max:[9999999999, "telfono muy largo"]
    },
    address:{
        type:String,
        required:[true, "direccion requerida" ],
        maxlength:[50, "direccion muy larga"],
        minlength:[10, "direccon muy corta"]
    },
    topics:{
        type:[String],
        enum:["AI", "Backend", "Frontend", "Devops"]

    },
    createdat: Date

})

//exportar el modelo 
const bootcampModel = mongoose.model("bootcamp",bootcampSchema)
module.exports=bootcampModel