const express =require('express')
const coursesModel =require('../models/coursesModel')
const { default: mongoose } = require('mongoose')
//definir ruteador
const router = express.Router()
//definir rutas con el rutador 
//traer todos los courses 
router.get('/',async(req, res)=>{
    //seleccionar todos los courses en la colection 
    try{
        const courses =await coursesModel.find()
        if(courses.length===0){
            res.
                status(400).
                json({
                succes:false,
                msg:"no hay courses en la collection"
            })
        }else{
            res.
                status(200).
                json({
                succes:true,
                data:courses
            })
        }
    } catch (error) {
        res.status(error.status).json({
            succes:false,
            msg:error.message
        })
    } 
})

//seleccionar courses por id
router.get('/:id',async(req,res)=>{

    try{
    //recoger el parametro id de la url 
    coursesid = req.params.id
    //validar el id suministrado
    if(!mongoose.Types.ObjectId.isValid(coursesid)){
        res.status(400).json({
            succes:false,
            msg:"el id no es valido"
        })
    }else{
        //seleccionar el courses por id 
        selected_bootcmap = await coursesModel.findById(coursesid)
        if(selected_bootcmap){
            //se encontro el courses
                    //enviar respuesta
                    res.status(200).json({
                        succes:true,
                        results: selected_bootcmap
                    })
        }else{
            //no se encontro el courses
            res.status(400).json({
                succes:false,
                msg:`no se encontró el courses ${coursesid}`
            })
        }
    }
    

    }catch(error){
    res.status(error.status).json({
        succes:false,
        msg:error.message
        })
    }

})

//crear courses 
router.post('/',async(req,res)=>{
    try {
    const newcourses=await coursesModel.create(req.body)
    res.json({
        success:true,
        result:newcourses
    })

    } catch (error) {
        res.status(500).json({
            succes:false,
            msg:error.message
        })
    }

})

router.put('/:id', async(req, res)=>{
    try{
        //recoger el parametro id de la url 
        coursesid = req.params.id
        //validar el id suministrado
        if(!mongoose.Types.ObjectId.isValid(coursesid)){
            res.status(400).json({
                succes:false,
                msg:"el id no es valido"
            })
        }else{
            //seleccionar el courses por id 
            selected_bootcmap = await coursesModel.
            findByIdAndUpdate(coursesid, req.body,{
                new:true
            })
            if(selected_bootcmap){
                //se encontro el courses
                        //enviar respuesta
                        res.status(200).json({
                            succes:true,
                            results: selected_bootcmap
                        })
            }else{
                //no se encontro el courses
                res.status(400).json({
                    succes:false,
                    msg:`no se encontró el courses ${coursesid}`
                })
            }
        }
        
    
        }catch(error){
        res.status(error.status).json({
            succes:false,
            msg:error.message
            })
        }
    
})

//delete 
router.delete('/:id', async(req,res)=>{
    try{
        //recoger el parametro id de la url 
        coursesid = req.params.id
        //validar el id suministrado
        if(!mongoose.Types.ObjectId.isValid(coursesid)){
            res.status(400).json({
                succes:false,
                msg:"el id no es valido"
            })
        }else{
            //seleccionar el courses por id 
            selected_bootcmap = await coursesModel.
            findByIdAndDelete(coursesid)
            if(selected_bootcmap){
                //se encontro el courses
                        //enviar respuesta
                        res.status(200).json({
                            succes:true,
                            results: selected_bootcmap
                        })
            }else{
                //no se encontro el courses
                res.status(400).json({
                    succes:false,
                    msg:`no se encontró el courses ${coursesid}`
                })
            }
        }
        
    
        }catch(error){
        res.status(error.status).json({
            succes:false,
            msg:error.message
            })
        }
})

//exportar ruteado 
module.exports=router