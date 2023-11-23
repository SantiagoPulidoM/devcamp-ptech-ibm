const express =require('express')
const bootcampModel =require('../models/bootcampModel')
const { default: mongoose } = require('mongoose')
//definir ruteador
const router = express.Router()
//definir rutas con el rutador 
//traer todos los bootcamps 
router.get('/',async(req, res)=>{
    //seleccionar todos los bootcamps en la colection 
    try{
        const bootcamps =await bootcampModel.find()
        if(bootcamps.length===0){
            res.
                status(400).
                json({
                succes:false,
                msg:"no hay bootcamps en la collection"
            })
        }else{
            res.
                status(200).
                json({
                succes:true,
                data:bootcamps
            })
        }
    } catch (error) {
        res.status(error.status).json({
            succes:false,
            msg:error.message
        })
    } 
})

//seleccionar bootcamp por id
router.get('/:id',async(req,res)=>{

    try{
    //recoger el parametro id de la url 
    bootcampid = req.params.id
    //validar el id suministrado
    if(!mongoose.Types.ObjectId.isValid(bootcampid)){
        res.status(400).json({
            succes:false,
            msg:"el id no es valido"
        })
    }else{
        //seleccionar el bootcamp por id 
        selected_bootcmap = await bootcampModel.findById(bootcampid)
        if(selected_bootcmap){
            //se encontro el bootcamp
                    //enviar respuesta
                    res.status(200).json({
                        succes:true,
                        results: selected_bootcmap
                    })
        }else{
            //no se encontro el bootcamp
            res.status(400).json({
                succes:false,
                msg:`no se encontró el bootcamp ${bootcampid}`
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

//crear bootcamp 
router.post('/',async(req,res)=>{
    try {
    const newBootcamp=await bootcampModel.create(req.body)
    res.json({
        success:true,
        result:newBootcamp
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
        bootcampid = req.params.id
        //validar el id suministrado
        if(!mongoose.Types.ObjectId.isValid(bootcampid)){
            res.status(400).json({
                succes:false,
                msg:"el id no es valido"
            })
        }else{
            //seleccionar el bootcamp por id 
            selected_bootcmap = await bootcampModel.
            findByIdAndUpdate(bootcampid, req.body,{
                new:true
            })
            if(selected_bootcmap){
                //se encontro el bootcamp
                        //enviar respuesta
                        res.status(200).json({
                            succes:true,
                            results: selected_bootcmap
                        })
            }else{
                //no se encontro el bootcamp
                res.status(400).json({
                    succes:false,
                    msg:`no se encontró el bootcamp ${bootcampid}`
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
        bootcampid = req.params.id
        //validar el id suministrado
        if(!mongoose.Types.ObjectId.isValid(bootcampid)){
            res.status(400).json({
                succes:false,
                msg:"el id no es valido"
            })
        }else{
            //seleccionar el bootcamp por id 
            selected_bootcmap = await bootcampModel.
            findByIdAndDelete(bootcampid)
            if(selected_bootcmap){
                //se encontro el bootcamp
                        //enviar respuesta
                        res.status(200).json({
                            succes:true,
                            results: selected_bootcmap
                        })
            }else{
                //no se encontro el bootcamp
                res.status(400).json({
                    succes:false,
                    msg:`no se encontró el bootcamp ${bootcampid}`
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
